

/* variaveis globais */
var rootUrl = "http://localhost/sistema-vendas-server/";
var clientUrl = "http://localhost/sistema-vendas-jquery/index.php";


/* métodos globais */
function getErrorMessage(jsonError) {
    return (JSON.parse(jsonError)).error.text;
}

function goPage(page) {
    location.href = clientUrl + "?go=" + page;
}

function verifyLogin() {
    $.cookie.json = true;
    if ($.cookie('usuario') == undefined)
        goPage("login");
}

function preparaData(data) {
    data.datepicker();
    data.datepicker("option", "dateFormat", "dd/mm/yy");
    data.keypress(function(event) {
        event.preventDefault();
    });
}

function getDescTipo($tipo)
{
    /*
     * Não é interessante criar switch dessa forma, pois quando formos
     * criar um novo tipo, teremos que vir até este código e adicionar
     * mais um item. A solução para este problema é criar classes abstratas,
     * mas como nosso objetivo é abordar o RESTful, não iremos fazer isso em 
     * um primeiro momento.
     */
    switch ($tipo) {
        case "a":
            return "Admin";
            break;
        case "v":
            return "Vendedor";
            break;
        case "c":
            return "Cliente";
            break;

    }

}


$("#linkSair").click(function() {

    $.ajax({
        type: "get",
        url: rootUrl + "usuario/logout",
        success: function() {
            $.removeCookie('usuario');
            goPage("login");
        }
    });

});





