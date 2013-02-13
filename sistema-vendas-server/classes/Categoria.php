<?php

class Categoria {

    public function post_save() {

    }

    function get_list($id) {


    }

    function get_listAll() {
        $sql = "SELECT * FROM categorias";
        $stmt = DB::prepare($sql);
        $stmt->execute();

        $result = $stmt->fetchAll();
        return $result;
    }

    function post_delete() {
        
    }

}