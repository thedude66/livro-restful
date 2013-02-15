

$(document).ready(function() {

    $.cookie.json = true;
    usuario = $.cookie('usuario');
    console.log(usuario);
    $("#nomeVendedor").html(usuario.nome);
    $("#hiddenIdVendedor").val(usuario.id);

    preparaData($("#inputData"));
});


$("#btnModalBuscarCliente").click(function() {
    $("#clienteModal").modal("show");
    $("#inputBuscarCliente").focus();

    if ($("#inputNomeCliente").val().length > 0)
    {
        $("#inputBuscarCliente").val($("#inputNomeCliente").val());
    }
});

$("#inputBuscarCliente").keydown(function(event) {
    if (event.keyCode == 13) {
        buscarCliente();
    }
});

$("#btnBuscarCliente").click(function() {
    buscarCliente();
});

function buscarCliente()
{
    $("#itemResultadoBusca").html("");
    $("#errorLoadCliente").hide();
    $("#buscaClienteload").show();


    $.ajax({
        type: "post",
        dataType: "json",
        url: rootUrl + "cliente/search",
        data: JSON.stringify({busca: $("#inputBuscarCliente").val()}),
        success: function(data) {
            $("#buscaClienteload").hide();

            data.result.forEach(function(cliente) {
                $("#itemResultadoBusca").append("<li><a class='itemClienteResult' href='#' data-nome='" + cliente.nome + "' data-id=" + cliente.id + " data-cpf='" + cliente.cpf + "'>" + cliente.nome + " - " + cliente.cpf + "</a></li>");
            });

        },
        error: function(result) {
            $("#buscaClienteload").hide();
            $("#errorLoadCliente").html(getErrorMessage(result.responseText));
            $("#errorLoadCliente").show();
        }
    });

}

$(".itemClienteResult").live("click", function() {
    $("#hiddenIdCliente").val($(this).attr("data-id"));
    $("#inputNomeCliente").val($(this).attr("data-nome"));
    $("#inputCpfCliente").val($(this).attr("data-cpf"));

    $("#inputNomeCliente").attr('disabled', 'disabled');
    $("#inputCpfCliente").attr('disabled', 'disabled');
    $("#btnNovoCliente").addClass("disabled").removeClass("btn-primary");

    $("#okCliente").show();

    $("#clienteModal").modal("hide");
});

$("#inputData").change(function() {
    $("#okData").show();
});

$("#btnNovoCliente").click(function() {

    if ($("#inputNomeCliente").val().length > 0)
    {
        $("#errorNewCliente").hide();
        $("#newClienteload").show();
        
        $.ajax({
            type: "post",
            dataType: "json",
            url: rootUrl + "cliente/newFromVendas",
            data: JSON.stringify({nome: $("#inputNomeCliente").val(), cpf: $("#inputCpfCliente").val()}),
            success: function(data) {
                $("#newClienteload").hide();
                cliente = data.result;
                $("#hiddenIdCliente").val(cliente.id);
                $("#inputNomeCliente").attr('disabled', 'disabled');
                $("#inputCpfCliente").attr('disabled', 'disabled');
                $("#btnNovoCliente").addClass("disabled").removeClass("btn-primary");
                $("#okCliente").show();

            },
            error: function(result) {
                $("#newClienteload").hide();
                $("#errorNewCliente").html(getErrorMessage(result.responseText));
                $("#errorNewCliente").show();
            }
        });
    }
    else
        {
            $("#errorNewCliente").show();
            $("#errorNewCliente").html("Preencher nome e cpf");
        }
});



