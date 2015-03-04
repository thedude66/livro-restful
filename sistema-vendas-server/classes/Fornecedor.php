<?php

class Fornecedor {

    public function post_save($data) {

        $sql = "";
        if ($data->id) {
            //update
            $sql = "UPDATE fornecedores SET nome=:nome,cnpj=:cnpj WHERE id=:id";
        } else {
            //insert
            $sql = "INSERT INTO fornecedores (nome,cnpj) VALUES (:nome,:cnpj)";
        }

        $stmt = DB::prepare($sql);
        $stmt->bindParam("nome", $data->nome);
        $stmt->bindParam("cnpj", $data->cnpj);

        if ($data->id)
            $stmt->bindParam("id", $data->id);

        $stmt->execute();

        return $data;
    }

    function get_list($id) {

        if (!isset($id))
            throw new Exception("Campo id requerido");

        $sql = "SELECT * FROM fornecedores WHERE id=:id";
        $stmt = DB::prepare($sql);
        $stmt->bindParam("id", $id);
        $stmt->execute();
        return$stmt->fetch();
    }

    function get_listAll() {
        $sql = "SELECT * FROM fornecedores";
        $stmt = DB::prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll();
        return $result;
    }

}