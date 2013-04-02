Projetos do livro Criando Sistemas RESTful com PHP
============

Este projeto contém todo o código fonte do livro, no qual você usar como referência para o seu aprendizado. 

## Demo
[http://www.danielschmitz.com.br/sistemavendas/sistema-vendas-jquery/index.php?go=login](http://www.danielschmitz.com.br/sistemavendas/sistema-vendas-jquery/index.php?go=login "Clique aqui para acessar   (login: admin senha: admin)")

    login: admin 
    senha: admin

## Projetos

**rest-base-flex** Contém um pequeno projeto em Flex que acessa o servidor através de HTTP, obtendo uma mensagem "Hello World".

**rest-base-jquery** Contém um pequeno projeto em html/jquery que acessa o servidor através de uma requisição HTTP, obtendo uma mensagem "Hello World"

**rest-base** Um pequeno projeto em PHP, utilizando o framework Slim, que contém um método chamado helloWorld para prover acesso aos projetos *rest-base-jquery* e *rest-base-flex* 

**sistema-vendas-server** Contém um projeto completo em PHP, que gerencia uma pequena loja de vendas. Utilizando o framework Slim, e acesso a banco via PDO, o sistema provê
diversas clases e métodos que são acessados via RESTful para a manipulação de dados. 

**sistema-vendas-jquery** Contém um projeto completo em HTML/jquery, com telas em html e programação em javascript para acessar o servidor restul *sistema-vendas-server*.

## Uma observação sobre deploy em sistemas linux
O sistema demo está em um host da bluehost, linux. Como o linux é case sensitive, foi preciso alterar o nome dos arquivos na pasta classes para minúsculas e também o nome das tabelas no banco de dados. Caso tenha algum problema, fale conosco.


