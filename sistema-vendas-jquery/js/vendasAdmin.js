
$(document).ready(function() {
    preparaData($("#dataInicial"));
    preparaData($("#dataFinal"));
    atualizaGrid();
});

function atualizaGrid() {

    $("#tableVendas").find("tbody tr").remove();
    $("#tableVendas").find("tbody").append('<tr><td colspan=10><div class="alert alert-success"><img src="img/ajax-loader.gif">Carregando...</div></td></tr>');

    $.ajax({
        type: "get",
        url: rootUrl + "venda/listAll",
        dataType: "json",
        success: function(data) {
            $("#tableVendas").find("tbody tr").remove();
            data.result.forEach(function(venda) {
                
                row = "<tr>"
                        + "<td><a id='edit' data-id='" + venda.id + "' href='#'><i class='icon-info-sign'></i></a></td>"
                        + "</td><td>" + venda.dataVenda + "</td>"
                        + "</td><td>" + venda.nomeVendedor + "</td>"
                        + "</td><td>" + venda.nomeCliente + "</td>"
                        + "</tr>";
                $("#tableVendas > tbody:last").append(row);
            });
            
        },
        error: function(result) {
            $("#tableVendas").find("tbody tr").remove();
            $("#errorVenda").html(getErrorMessage(result.responseText));
            $("#errorVenda").show();
        }
    });


}


