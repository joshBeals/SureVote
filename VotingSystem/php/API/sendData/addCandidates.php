<?php

    // Headers
    // header('Access-Control-Allow-Origin: *');
    // header('Content-Type: application/json');
    // header('Access-Control-Allow-Methods: POST');
    // header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once('../../config/database.php');
    include_once('../../models/data.php');

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Main Login
    if(isset($_POST)){
        $data = explode(',', $_POST['info']);
        if($data[0] == '' || $data[1] == '' || $data[2] == '' || $data[3] == '' || $data[4] == '' || $data[5] == ''){
            echo(json_encode(array('status'=>'0', 'message'=>'Fields cannot be left empty!')));
        }else{
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS election_candidates (
                candidate_id INT(11) NOT NULL AUTO_INCREMENT,
                candidate_name VARCHAR(255) NOT NULL,
                candidate_matric VARCHAR(255) NOT NULL,
                faculty_id INT(11),
                dept_id INT(11),
                position_id INT(11),
                election_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(candidate_id),
                FOREIGN KEY (election_id) REFERENCES school_elections(election_id)
            )";
            
            $stmt = $db->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM election_candidates WHERE candidate_name='$data[0]' and election_id=$data[3]"; 

                // Prepared statement
                $stmt = $db->prepare($query);

                // Execute the statement
                if($stmt->execute()){
                    $num = $stmt->rowCount();
                    if($num > 0){
                        echo(json_encode(array('status'=>'0', 'message'=>'Candidate Already Exists!')));
                    }else{
                        // Insert into the table
                        $query = 'INSERT INTO election_candidates
                        SET 
                            candidate_name = :candidate_name,
                            candidate_matric = :candidate_matric,
                            faculty_id = :faculty_id,
                            dept_id = :dept_id,
                            position_id = :position_id,
                            election_id = :election_id,
                            created_at = CURRENT_TIMESTAMP';
        
                        // Prepre Statement
                        $stmt = $db->prepare($query);
        
                        // Clean data
                        $data[0] = htmlspecialchars(strip_tags($data[0]));
                        $data[1] = htmlspecialchars(strip_tags($data[1]));
        
                        // Bind data
                        $stmt->bindParam(':candidate_name', $data[0]);
                        $stmt->bindParam(':candidate_matric', $data[1]);
                        $stmt->bindParam(':faculty_id', $data[2]);
                        $stmt->bindParam(':dept_id', $data[3]);
                        $stmt->bindParam(':position_id', $data[5]);
                        $stmt->bindParam(':election_id', $data[4]);
        
                        // Execute query
                        if($stmt->execute()){
                            echo(json_encode(array('status'=>'1', 'message'=>'Candidate has been added!')));
                        }
                    }
                }
            }
        }
    }

?>