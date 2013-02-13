<?php

class Fornecedor {

    public function post_save() {

    }

    function get_list($id) {


    }

    function get_listAll() {
        $sql = "SELECT * FROM fornecedores";
        $stmt = DB::prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll();
        return $result;
    }

    function post_delete() {
        
    }

}