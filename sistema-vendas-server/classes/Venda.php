<?php

class Venda {

    public function post_finalizar($venda) {

        $sqlVenda = "INSERT INTO vendas (idCliente,idVendedor,dataVenda) VALUES (:idCliente,:idVendedor,:dataVenda)";
        $sqlItemVenda = "INSERT INTO itensVenda (idVenda,idProduto,quantidade,precoUnitario) VALUES (:idVenda,:idProduto,:quantidade,:precoUnitario)";
        
        try {

            DB::beginTransaction();

            $stmtVendas = DB::prepare($sqlVenda);
            $stmtVendas->bindParam("idCliente", $venda->idCliente);
            $stmtVendas->bindParam("idVendedor", $venda->idVendedor);
            $stmtVendas->bindParam("dataVenda", DB::dateToMySql($venda->data));
            $stmtVendas->execute();
            
            $venda->idVenda = DB::lastInsertId();
            
            foreach ($venda->itens as $item) {
                $stmtItem = DB::prepare($sqlItemVenda);
                $stmtItem->bindParam("idVenda", $venda->idVenda);
                $stmtItem->bindParam("idProduto", $item->idProduto);
                $stmtItem->bindParam("quantidade", $item->quantidade);
                $stmtItem->bindParam("precoUnitario", $item->preco);
                $stmtItem->execute();
            }

            DB::commit();
            
        } catch (Exception $exc) {
            DB::rollBack();
            throw new Exception($exc->getMessage());
        }
        
        return $venda;
    }
    
    public function get_listAll(){
        
        $sql = "SELECT v.*,u.nome as nomeCliente,u2.nome as nomeVendedor FROM vendas v,clientes c,vendedores e, usuarios u, usuarios u2 WHERE "
                + "u.id=c.idUsuario and c.id=v.idCliente " 
                + "and u2.id=e.idUsuario and e.id=v.idVendedor";
        $sql = "SELECT * FROM vendas";
        $stmt = DB::prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }
            

}