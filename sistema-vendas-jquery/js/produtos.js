
$(document).ready(function() {
    verifyLogin();
    atualizaGrid();
});
$('#btnNovo').click(function() {

    if ($("#inputId").val() != "") {
        $("form")[0].reset();
        $("#inputId").val("");
        $("#errorServer").hide();
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
            ativo: $("#checkAtivo").val(),
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

                $row = "<tr>"
                        + "<td><a id='edit' href='#' data-id='" + produto.id + "'>" + produto.nome + "</a>"
                        + "</td><td>" + produto.nomeCategoria
                        + "</td><td> <a href='#'><i class='icon-remove' data-id='" + produto.id + "' data-nome='" + produto.nome + "'/></i></a>"
                        + "</td></tr>";
                $("#tableProdutos > tbody:last").append($row);
            });
        }
    });
}


$(".icon-remove").live("click", function() {
    id = $(this).attr("data-id");
    nome = $(this).attr("data-nome");
    $row = $(this);
    if (confirm("Excluir " + nome + "?"))
    {

        $.ajax({
            type: "post",
            url: rootUrl + "produto/delete",
            dataType: "json",
            data: JSON.stringify({id: id}),
            success: function() {
                $row.parent().parent().parent().fadeTo(400, 0, function() {
                    $row.parent().parent().parent().remove();
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
            $("#checkAivo").val(produto.ativo);
            $("#selectCategoria").val(produto.idCategoria);
            $("#selectFornecedor").val(produto.idFornecedor);
            
            
            $("#novoModal").modal("show");
        }
    });


});    