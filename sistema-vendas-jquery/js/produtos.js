
$(document).ready(function() {
    verifyLogin();
    atualizaGrid();
    loadCategorias();
    loadFornecedores();

});
$('#btnNovo').click(function() {

    if ($("#inputId").val() != "") {
        $("form")[0].reset();
        $("#inputId").val("");
        $("#errorServer").hide();
         $("input[name=checkAtivo]").attr("checked",true);
    }
    
    
    $('#novoModal').modal('show');
});

$('#btnBuscar').click(function() {
    atualizaGrid();
});

$('#salvar').click(function() {

    var valido = true;
    //remove o erro destacado em todos os inputs
    $("#form input").map(function() {
        $(this).parents("div").removeClass("error");
    });
    if ($('#inputNome').val().length == 0)
    {
        valido = false;
        $('#inputNome').parents("div").addClass("error");
    }

    if (valido)
    {
        travarFormulario();

        produto = JSON.stringify({
            idProduto: $("#inputId").val(),
            nome: $("#inputNome").val(),
            quantidade: $("#inputQuantidade").val(),
            quantidadeMinima: $("#inputQuantidadeMinima").val(),
            precoUnitario: $("#inputPrecoUnitario").val(),
            descricao: $("#inputDescricao").val(),
            ativo: $('input[name=checkAtivo]').is(':checked'),
            idCategoria: $("#selectCategoria").val(),
            idFornecedor: $("#selectFornecedor").val()
        });

        $.ajax({
            type: "post",
            url: rootUrl + "produto/save",
            dataType: "json",
            data: produto,
            success: function(result) {
                destravarFormulario();
                $('#novoModal').modal('hide');
                $("form")[0].reset();
                atualizaGrid();
            },
            error: function(result) {
                destravarFormulario();
                $("#errorServer").html(getErrorMessage(result.responseText));
                $("#errorServer").show();
            }

        });
    }
    else
    {
        $("#errorEmpty").show();
        $("#erroServer").hide();
    }

});
function travarFormulario()
{
    $("#errorEmpty").hide();
    $("form").hide();
    $("#saveMessage").show();
    $("#salvar").addClass("disabled");
    $("#clearForm").addClass("disabled");
}

function destravarFormulario()
{
    $("#errorEmpty").hide();
    $("#errorServer").hide();
    $("form").show();
    $("#saveMessage").hide();
    $("#salvar").removeClass("disabled");
    $("#clearForm").removeClass("disabled");
}

function atualizaGrid()
{

    $("#tableProdutos").find("tbody tr").remove();
    $("#tableProdutos").find("tbody").append('<tr><td colspan=10><div class="alert alert-success"><img src="img/ajax-loader.gif">Carregando...</div></td></tr>');

    filtro = "";
    if ($("#filtrar").val())
        filtro = "/" + $("#filtrar").val();

    $.ajax({
        type: "get",
        url: rootUrl + "produto/listAll" + filtro,
        dataType: "json",
        success: function(data) {
            $("#tableProdutos").find("tbody tr").remove();
            data.result.forEach(function(produto) {

                row = "<tr>"
                        + "<td><a id='edit' href='#' data-id='" + produto.id + "'>" + produto.nome + "</a>"
                        + "</td><td>" + produto.nomeCategoria
                        + "</td><td> <a href='#'><i class='icon-remove' data-id='" + produto.id + "' data-nome='" + produto.nome + "'/></i></a>"
                        + "</td></tr>";
                $("#tableProdutos > tbody:last").append(row);
            });
        },
        error: function(result)
        {
            $("#errorLoad").html(getErrorMessage(result.responseText));
            $("#errorLoad").show();
            $("#tableProdutos").find("tbody tr").remove();
        }
    });
}


$(".icon-remove").live("click", function() {
    id = $(this).attr("data-id");
    nome = $(this).attr("data-nome");
    row = $(this);
    if (confirm("Excluir " + nome + "?"))
    {

        $.ajax({
            type: "post",
            url: rootUrl + "produto/delete",
            dataType: "json",
            data: JSON.stringify({id: id}),
            success: function() {
                row.parent().parent().parent().fadeTo(400, 0, function() {
                    row.parent().parent().parent().remove();
                });
            },
            error: function() {
                //todo
            }
        });
    }

});

$("#edit").live("click", function() {

    id = $(this).attr("data-id");

    $("#errorServer").hide();
    $("#errorEmpty").hide();


    $.ajax({
        type: "get",
        url: rootUrl + "produto/list/" + id,
        dataType: "json",
        success: function(data) {

            
            produto = data.result;
            $("#inputId").val(produto.id);
            $("#inputNome").val(produto.nome);
            $("#inputQuantidade").val(produto.quantidade);
            $("#inputQuantidadeMinima").val(produto.quantidadeMinima);
            $("#inputPrecoUnitario").val(produto.precoUnitario);
            $("#inputDescricao").val(produto.descricao);
            $("input[name=checkAtivo]").attr("checked",produto.ativo==0?false:true);
            $("#selectCategoria").val(produto.idCategoria);
            $("#selectFornecedor").val(produto.idFornecedor);

            $("#inputPrecoUnitario").maskMoney('mask');

            $("#novoModal").modal("show");
        },
        error: function(result)
        {
            $("#errorLoad").html(getErrorMessage(result.responseText));
            $("#errorLoad").show();
        }
    });


});


function loadCategorias() {

    $.ajax({
        type: "get",
        dataType: "json",
        url: rootUrl + "categoria/listAll",
        success: function(data) {
            selectFornecedor = $("#selectCategoria");
            selectFornecedor.find('option').remove().end();
            
            $("#listCategorias").html("");
            
            

           data.result.forEach(function(categoria){

                //adiciona dados no dropdown de categorias
                selectFornecedor.append('<option value="' + categoria.id + '">' + categoria.nome + '</option>');
                
                //adiciona dados na tabela de categorias
                row = "<a href='#' data-id='"+categoria.id+"' class='categoriaEdit label label-success'>"+categoria.nome+"</a>&nbsp;&nbsp;";
                $("#listCategorias").append(row);
                
            });

        },
        error: function(result) {
            $("#errorLoad").html(getErrorMessage(result.responseText));
            $("#errorLoad").show();
        }
    });

}

function loadFornecedores() {
    $.ajax({
        type: "get",
        dataType: "json",
        url: rootUrl + "fornecedor/listAll",
        success: function(data) {
            selectFornecedor = $("#selectFornecedor");
            selectFornecedor.find('option').remove().end();

            data.result.forEach(function(row){
                selectFornecedor.append('<option value="' + row.id + '">' + row.nome + '</option>');
            });

        },
        error: function(result) {
            $("#errorLoad").html(getErrorMessage(result.responseText));
            $("#errorLoad").show();
        }
    });
}

$("#modalCategoriasFechar").click(function(){
    $("#categoriaModal").modal('hide');
});

$("#btnCategoria").click(function(){
    $("#categoriaModal").modal('show');
    
});

$(".categoriaEdit").live("click",function(){
    console.log($(this).attr("data-id"));
    $("#hiddenCategoriaId").val($(this).attr("data-id"));
    $("#inputCategoriaNome").val($(this).html());
});