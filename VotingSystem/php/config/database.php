<?php

class Database
{
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $dbname = 'e-voting';
    private $conn;
    private $dsn;

    public function connect(){

        $this->conn = null;
        $this->dsn = 'mysql:host='.$this->host.';dbname='.$this->dbname;
        
        try{
            $this->conn = new PDO($this->dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
            return $this->conn; 
        }catch(PDOException $e){
            return ('Connection Error: '.$e->getMessage());
        }
    }
}
