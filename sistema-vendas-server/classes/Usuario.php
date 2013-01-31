<?php
class Usuario {
    
    
    public function post_insert($usuario)
    {
        $sql = "INSERT INTO usuarios (nome,email,login,senha,tipo) VALUES (:nome,:email,:login,:senha,:tipo)";
        $stmt = DB::prepare($sql);
        $stmt->bindParam("nome", $usuario->nome);
        $stmt->bindParam("email", $usuario->email);
        $stmt->bindParam("login", $usuario->login);
        $stmt->bindParam("senha", $usuario->senha);
        $stmt->bindParam("tipo", $usuario->tipo);
        $stmt->execute();
        $usuario->id = DB::lastInsertId();
        return $usuario;
    }
    
    
    public function post_login($usuario)
    {
        
        if ( (empty($usuario->login)) or (empty($usuario->senha)) )
            throw new Exception("Login ou senha precisam ser preenchidos");
        
        $sql = "SELECT * FROM usuarios WHERE (login=:login and senha=:senha)";
        $stmt = DB::prepare($sql);
        $stmt->bindParam("login", $usuario->login);
        $stmt->bindParam("senha", $usuario->senha);
        $stmt->execute();
        
        $db_usuario = $stmt->fetch();
        
        if ($db_usuario!=null)
        {
            $this->doLogin($db_usuario);
            unset($db_usuario->senha);
            return $db_usuario;
        }
        else
            throw new Exception("Erro ao efetuar login. Usuário/Senha incorretos");
        
    }
    
    protected function doLogin($usuario)
    {
        $_SESSION["login_id"] = $usuario->id;
    }
    
    public function get_isLogged()
    {
        return isset($_SESSION["login_id"]);
    }  
    
    public function get_logout()
    {
        $_SESSION["login_id"] = null;
        return true;
    }
    
    
}