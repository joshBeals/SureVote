<?php

    class Data{

        private $conn;
        private $table = 'schools';

        public function __construct($db){
            $this->conn = $db;
        }

        public function readSchools(){

            $query = 'SELECT * FROM '. $this->table .'';

            // Prepred statement
            $stmt = $this->conn->prepare($query);

            // Execute the statement
            $stmt->execute();

            // Return the data
            if($stmt){
                return $stmt;
            }else{
                return null;
            }

        }

    }

?>