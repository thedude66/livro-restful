<?php

class Vendedor {

    public function post_save($vendedor) {



        if (isset($vendedor->id)) {
            //update
        } else {

            //insert
            $sqlInsertUsuario = "INSERT INTO usuarios (nome,email,login,senha,tipo) VALUES (:nome,:email,:login,:senha,:tipo)";
            $sqlInsertVendedor = "INSERT INTO vendedores (cpf,matricula,ativo,idUsuario,dataContratacao) VALUES (:cpf,:matricula,:ativo,:idUsuario,:dataContratacao)";
            //FALTA DATACONTRATACAO

            try {

                DB::beginTransaction();

                $vendedor->ativo = "1";
                $vendedor->tipo = "v";
                
                $vendedor->dataContratacao = DB::dateToMySql($vendedor->dataContratacao);
                

                $stmtUsuario = DB::prepare($sqlInsertUsuario);
                $stmtUsuario->bindParam("nome", $vendedor->nome);
                $stmtUsuario->bindParam("email", $vendedor->email);
                $stmtUsuario->bindParam("login", $vendedor->login);
                $stmtUsuario->bindParam("senha", $vendedor->senha);
                $stmtUsuario->bindParam("tipo", $vendedor->tipo);
                
                $stmtUsuario->execute();

                $vendedor->idUsuario = DB::lastInsertId();

                $stmtVendedor = DB::prepare($sqlInsertVendedor);
                $stmtVendedor->bindParam("cpf", $vendedor->cpf);
                $stmtVendedor->bindParam("matricula", $vendedor->matricula);
                $stmtVendedor->bindParam("ativo", $vendedor->ativo);
                $stmtVendedor->bindParam("idUsuario", $vendedor->idUsuario);
                $stmtVendedor->bindParam("dataContratacao", $vendedor->dataContratacao);
                $stmtVendedor->execute();

                $vendedor->id = DB::lastInsertId();

                DB::commit();
            } catch (Exception $exc) {
                DB::rollBack();
                throw new Exception($exc->getMessage());
            }

            return $vendedor;
        }
    }

}