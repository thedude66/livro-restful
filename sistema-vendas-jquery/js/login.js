
$("#btnIr").click(function(event) {

    valido = true;

    $("#form-login input").map(function() {
        if ($(this).val().length == 0)
        {
            valido = false;
            $(this).parents("div").addClass("error");
        }
        else
        {
            $(this).parents("div").removeClass("error");
        }
    });

    if (valido)
    {
        $("#erroLoginEmpty").hide();
        $("#erroLoginServer").hide();
        $("#btnIr").addClass("disabled");
        $("#tryLogin").show();

        data = JSON.stringify({"login": $("#login").val(), "senha": $("#senha").val()});

        $.ajax({
            type: "post",
            url: rootUrl + "usuario/login",
            dataType: "json",
            data: data,
            success: onSuccessLogin,
            error: onErrorLogin
        });
    }
    else
    {
        $("#erroLoginServer").hide();
        $("#erroLoginEmpty").show();
    }
    
});

function onSuccessLogin(data) {

    $("#tryLogin").hide();
    $("#erroLoginServer").hide();
    $("#erroLoginEmpty").hide();

    $.cookie.json = true;
    $.cookie('usuario', data.result, {expires: 1});

    goPage("bemVindo");

}

function onErrorLogin(error) {
    $("#tryLogin").hide();
    $("#erroLoginServer").html(getErrorMessage(error.responseText));
    $("#erroLoginServer").show();
    $("#btnIr").removeClass("disabled");
}


