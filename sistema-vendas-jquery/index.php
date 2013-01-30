<?php
/**
 * Sistema de vendas em jQuery. O PHP é usado apenas como template das páginas
 * funcionando da seguinte forma:
 * 
 * index.php?go=<nomeDaPagina>
 * 
 * nomeDaPagina será carregado como um arquivo PHP na DIV "pagina".
 * 
 * Todo acesso a dados é feito pelo PHP. Cada arquivo PHP possui a parte
 * HTMl e a parte JavaScript no mesmo arquivo, para facilitar
 * 
 */

if (isset($_GET["go"]))
{
    if (!file_exists($_GET["go"] . ".html"))
        $_GET["go"] = "login";
}
else
{
    $_GET["go"] = "login";
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Sistema Vendas</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="css/bootstrap.min.css" rel="stylesheet"/>
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet"/>
        <link href="css/app.css" rel="stylesheet"/>
    </head>
    <body>
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/app.js" type="text/javascript"></script>

        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="#">Sistema Vendas</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            
                            <?php
                            /**
                             * Menu é montado de acordo com a pessoa logada (sessão)
                             */
                            ?>
                            
                            
                            <li class="active"><a href="index.php?go=home">Home</a></li>
                            <li><a href="index.php?go=about">About</a></li>
                            <li><a href="index.php?go=contact">Contact</a></li>
                            
                            
                        </ul>
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container">
            
            <p>
                <?php require($_GET["go"] . ".html")?>                
            </p>

        </div> <!-- /container -->
        
    </body>
</html>