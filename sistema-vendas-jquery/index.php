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
if (isset($_GET["go"])) {
    if (!file_exists($_GET["go"] . ".html"))
        $_GET["go"] = "login";
}
else {
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
        <link href="css/base/jquery-ui.css" rel="stylesheet"/>

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->


        <link href="css/app.css" rel="stylesheet"/>
    </head>
    <body>
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/jquery-ui-1.10.0.custom.min.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/jquery.cookie.js" type="text/javascript"></script>
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
                            function getActive($go) {
                                if ($go == $_GET["go"])
                                    return "class='active'";
                                return '';
                            }

                            $mensagemUsuario = "";
                            $usuario = null;

                            //Obtém o cookie da pessoa logada
                            if (isset($_COOKIE['usuario'])) {
                                $usuario = json_decode($_COOKIE['usuario']);
                                $mensagemUsuario = "[Olá {$usuario->nome}] <a id='linkPerfil' href='#' class='navbar-link'>Perfil</a> - <a id='linkSair' href='#' class='navbar-link'>Sair</a> ";
                            }

                            if (isset($usuario)) {
                                if ($usuario->tipo == "a") {
                                    echo "<li " . getActive('bemVindo') . "><a href='index.php?go=bemVindo'>Home</a></li>";
                                    echo "<li " . getActive('vendedores') . "><a href='index.php?go=vendedores'>Vendedores</a></li>";
                                    echo "<li " . getActive('clientes') . "><a href='index.php?go=clientes'>Clientes</a></li>";
                                    echo "<li " . getActive('produtos') . "><a href='index.php?go=produtos'>Produtos</a></li>";
                                    echo "<li " . getActive('vendas') . "><a href='index.php?go=vendas'>Vendas</a></li>";
                                }
                            }
                            ?>


                        </ul>

                        <p class="navbar-text pull-right"><?php echo $mensagemUsuario ?></p>

                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

        <div class="container">
            <?php require($_GET["go"] . ".html") ?>
        </div> <!-- /container -->

    </body>
</html>