

var rootUrl = "http://localhost/sistema-vendas-server/";
var clientUrl = "http://localhost/sistema-vendas-jquery/index.php";

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



