<?php

    class Data{

        // Connections
        private $conn;
        private $schooltable = 'schools';
        private $facultytable = 'faculties';
        private $deptable = 'departments';
        private $faculty_elections = 'faculty_elections';
        private $school_elections = 'school_elections';

        // Faculty Variables
        public $faculty_name;
        public $faculty_email;
        public $election_title;
        public $election_description;
        public $school_id;

        // Department Variables
        public $dept_name;
        public $dept_email;
        public $faculty_id;

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

        // Get All Faculties
        public function readDepts(){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS departments (
                dept_id INT(11) NOT NULL AUTO_INCREMENT,
                dept_name VARCHAR(255) NOT NULL,
                dept_email VARCHAR(255) NOT NULL,
                faculty_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(dept_id),
                FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
            )";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = 'SELECT * FROM '. $this->deptable .'';

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

        // Get Department of a particular school
        public function readSchoolDept($schID){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS departments (
                dept_id INT(11) NOT NULL AUTO_INCREMENT,
                dept_name VARCHAR(255) NOT NULL,
                dept_email VARCHAR(255) NOT NULL,
                faculty_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(dept_id),
                FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
            )";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT 
                            *
                        FROM
                            departments
                        INNER JOIN
                            faculties
                        ON
                            departments.faculty_id = faculties.faculty_id
                        WHERE
                            faculties.school_id = $schID";

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
        }

        // Get Department of a particular faculty
        public function readDepartment($facID){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS departments (
                dept_id INT(11) NOT NULL AUTO_INCREMENT,
                dept_name VARCHAR(255) NOT NULL,
                dept_email VARCHAR(255) NOT NULL,
                faculty_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(dept_id),
                FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
            )";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM ". $this->deptable ." WHERE faculty_id=$facID";  

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
        }

        // Get Elections from a particular school
        public function readElections($schID){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS school_elections (
                election_id INT(11) NOT NULL AUTO_INCREMENT,
                election_title VARCHAR(255) NOT NULL,
                election_description VARCHAR(255) NOT NULL,
                school_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(election_id),
                FOREIGN KEY (school_id) REFERENCES schools(school_id)
            )";
            
            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM school_elections WHERE school_id=".$schID;  

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
        }

        public function readFacElections($facID){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS faculty_elections (
                election_id INT(11) NOT NULL AUTO_INCREMENT,
                election_title VARCHAR(255) NOT NULL,
                election_description VARCHAR(255) NOT NULL,
                faculty_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(election_id),
                FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
            )";

            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM ". $this->faculty_elections ." WHERE faculty_id=$facID";  

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
                $facID = 0;
                $query = "SELECT faculty_id FROM faculties WHERE faculty_name='$this->faculty_name'";
                $stmt = $this->conn->prepare($query);
                if($stmt->execute()){
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        $facID = $row['faculty_id'];
                    }
                }
                    return $facID;
                }else{
                    // Print error if something goes wrong
                    printf("Error: %s.\n", $stmt->error);
                    return 0;
                }
            }else{
                header('location: .../loginTemp.php');
            }
           
        }

         // Create Department
         public function insertDept(){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS departments (
                dept_id INT(11) NOT NULL AUTO_INCREMENT,
                dept_name VARCHAR(255) NOT NULL,
                dept_email VARCHAR(255) NOT NULL,
                faculty_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(dept_id),
                FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
            )";
            
            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                 // Insert into the table
                $query = 'INSERT INTO departments
                SET 
                    dept_name = :dept_name,
                    dept_email = :dept_email,
                    faculty_id = :faculty_id,
                    created_at = CURRENT_TIMESTAMP';

                // Prepre Statement
                $stmt = $this->conn->prepare($query);

                // Clean data
                $this->dept_name = htmlspecialchars(strip_tags($this->dept_name));
                $this->dept_email = htmlspecialchars(strip_tags($this->dept_email));
                $this->faculty_id = htmlspecialchars(strip_tags($this->faculty_id));

                // Bind data
                $stmt->bindParam(':dept_name', $this->dept_name);
                $stmt->bindParam(':dept_email', $this->dept_email);
                $stmt->bindParam(':faculty_id', $this->faculty_id);

                // Execute query
                if($stmt->execute()){
                    $depID = 0;
                    $query = "SELECT dept_id FROM departments WHERE dept_name='$this->dept_name'";
                    $stmt = $this->conn->prepare($query);
                    if($stmt->execute()){
                        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                            $depID = $row['dept_id'];
                        }
                    }
                    return $depID;
                }else{
                    // Print error if something goes wrong
                    printf("Error: %s.\n", $stmt->error);
                    return 0;
                }
            }else{
                header('location: .../loginTemp.php');
            }
           
        }

        // Add Election to the SchoolAcct
        public function addElection(){
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS school_elections (
                election_id INT(11) NOT NULL AUTO_INCREMENT,
                election_title VARCHAR(255) NOT NULL,
                election_description VARCHAR(255) NOT NULL,
                school_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(election_id),
                FOREIGN KEY (school_id) REFERENCES schools(school_id)
            )";
            
            $stmt = $this->conn->prepare($query);

            if($stmt->execute()){
                $elecTitle = $this->election_title;
                $schID = $this->school_id;
                $query = "SELECT * FROM school_elections WHERE election_title='$elecTitle' and school_id=$schID";
                
                // Prepared statement
                $stmt = $this->conn->prepare($query);
                
                // Execute the statement
                if($stmt->execute()){
                    $num = $stmt->rowCount();
                    if($num > 0){
                        echo(json_encode(array('status'=>'0', 'message'=>'Election Already Exists!')));
                    }else{
                        // Insert into the table
                        $query = 'INSERT INTO school_elections
                        SET 
                            election_title = :election_title,
                            election_description = :election_description,
                            school_id = :school_id,
                            created_at = CURRENT_TIMESTAMP';

                        // Prepre Statement
                        $stmt = $this->conn->prepare($query);

                        // Clean data
                        $this->election_title = htmlspecialchars(strip_tags($this->election_title));
                        $this->election_description = htmlspecialchars(strip_tags($this->election_description));
                        $this->school_id = htmlspecialchars(strip_tags($this->school_id));

                        // Bind data
                        $stmt->bindParam(':election_title', $this->election_title);
                        $stmt->bindParam(':election_description', $this->election_description);
                        $stmt->bindParam(':school_id', $this->school_id);

                        if($stmt->execute()){
                                echo(json_encode(array('status'=>'1', 'message' => "Election added successfully!")));
                        }else{
                                echo(json_encode(array('status'=>'0', 'message' => "Election wasn't added!")));
                        }
                    }
                }else{
                    echo(json_encode(array('status'=>'0', 'message'=>"Election wasn't added!")));
                }   
            }else{
                echo(json_encode(array('status'=>'0', 'message' => "Election wasn't added!")));
            }



        }

    }

?>