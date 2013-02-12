<?php

class Produto {

    public function post_save($produto) {

        $sqlSave="";
        //TODO: foto -> Blob
        if ($produto->idProduto) {
            //update
            $sqlSave = "UPDATE produtos SET idCategoria=:idCategoria,idFornecedor=:idFornecedor,nome=:nome,quantidade=:quantidade,quantidadeMinima=:quantidadeMinima,precoUnitario=:precoUnitario,descricao=:descricao,ativo=:ativo WHERE id=:idProduto";
        } else {

            //insert
            $sqlSave = "INSERT INTO produtos (idCategoria,idFornecedor,nome,quantidade,precoUnitario,descricao,ativo) VALUES (:idCategoria,:idFornecedor,:nome,:quantidade,:precoUnitario,:descricao,:ativo)";
        }

        $stmtProduto = DB::prepare($sqlSave);
        $stmtProduto->bindParam("idCategooria", $produto->idCategoria);
        $stmtProduto->bindParam("idFornecedor", $produto->idFornecedor);
        $stmtProduto->bindParam("nome", $produto->nome);
        $stmtProduto->bindParam("quantidade", $produto->quantidade);
        $stmtProduto->bindParam("quantidadeMinima", $produto->quantidadeMinima);
        $stmtProduto->bindParam("precoUnitario", $produto->precoUnitario);
        $stmtProduto->bindParam("descricao", $produto->descricao);
        $stmtProduto->bindParam("ativo", $produto->ativo);

        $stmtProduto->execute();

        if (!$produto->idProduto)
            $produto->id = DB::lastInsertId();

        return $produto;
    }

    function get_list($id) {

        $sql = "SELECT p.*,c.nome as nomeCategoria,f.nome as nomeFornecedor FROM produtos p,categorias c,fornecedores f WHERE p.idCategoria=c.id AND p.idFornecedor=f.id AND p.id=:id";
        $stmt = DB::prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        return($stmt->fetch());
    }

    function get_listAll($parameter) {

        $filtroWHERE = "";

        if ($parameter)
            $filtroWHERE = " AND p.nome LIKE '%{$parameter}%'";

        $sql = "SELECT p.*,c.nome as nomeCategoria,f.nome as nomeFornecedor FROM produtos p,categorias c,fornecedores f WHERE p.idCategoria=c.id AND p.idFornecedor=f.id AND $filtroWHERE";

        $stmt = DB::prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll();
        return $result;
    }

    function post_delete($produto) {
        $sqlDeleteProduto = "DELETE FROM produtos WHERE id=:id";
        
            $stmt = DB::prepare($sqlDeleteProduto);
            $stmt->bindParam("id", $produto->id);
            $stmt->execute();

            return true;
        
    }

}