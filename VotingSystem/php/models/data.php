<?php

    class Data{

        // Connections
        private $conn;
        private $schooltable = 'schools';
        private $facultytable = 'faculties';

        // Variables
        public $faculty_name;
        public $faculty_email;
        public $school_id;

        public function __construct($db){
            $this->conn = $db;
        }

        // Get Schools
        public function readSchools(){

            $query = 'SELECT * FROM '. $this->schooltable .'';

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
        // Get All Faculties
        public function readFaculties(){

            $query = 'SELECT * FROM '. $this->facultytable .'';

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

        // Get Faculties of a particular school
        public function readFaculty($schID){

            $query = "SELECT * FROM ". $this->facultytable ." WHERE school_id=$schID";  

            // Prepared statement
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

        // Create Faculty
        public function insertFaculty(){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS faculties (
                faculty_id INT(11) NOT NULL AUTO_INCREMENT,
                faculty_name VARCHAR(255) NOT NULL,
                faculty_email VARCHAR(255) NOT NULL,
                school_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(faculty_id),
                FOREIGN KEY (school_id) REFERENCES schools(school_id)
            )";
            
            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                 // Insert into the table
                $query = 'INSERT INTO faculties
                SET 
                    faculty_name = :faculty_name,
                    faculty_email = :faculty_email,
                    school_id = :school_id,
                    created_at = CURRENT_TIMESTAMP';

                // Prepre Statement
                $stmt = $this->conn->prepare($query);

                // Clean data
                $this->faculty_name = htmlspecialchars(strip_tags($this->faculty_name));
                $this->faculty_email = htmlspecialchars(strip_tags($this->faculty_email));
                $this->school_id = htmlspecialchars(strip_tags($this->school_id));

                // Bind data
                $stmt->bindParam(':faculty_name', $this->faculty_name);
                $stmt->bindParam(':faculty_email', $this->faculty_email);
                $stmt->bindParam(':school_id', $this->school_id);

                // Execute query
                if($stmt->execute()){
                    return true;
                }

                // Print error if something goes wrong
                printf("Error: %s.\n", $stmt->error);

                return false;
            }else{
                return false;
            }
           
        }

    }

?>