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

    // Main Logic
    if(isset($_POST)){
        $data = explode(",", $_POST['position']);
        if($data[0] == '' || $data[1] == ''){
            echo(json_encode(array('status'=>'0', 'message'=>'Field cannot be left empty!')));
        }else{
            // Create Table
            $query = "CREATE TABLE IF NOT EXISTS election_positions (
                position_id INT(11) NOT NULL AUTO_INCREMENT,
                position_name VARCHAR(255) NOT NULL,
                election_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(position_id),
                FOREIGN KEY (election_id) REFERENCES school_elections(election_id)
            )";
            
            $stmt = $db->prepare($query);

            if($stmt->execute()){
                $query = "SELECT * FROM election_positions WHERE position_name='$data[0]' and election_id=$data[1]";  

                // Prepared statement
                $stmt = $db->prepare($query);
                
                // Execute the statement
                if($stmt->execute()){
                    $num = $stmt->rowCount();
                    if($num > 0){
                        echo(json_encode(array('status'=>'0', 'message'=>'Position Already Exists!')));
                    }else{
                        // Insert into the table
                        $query = 'INSERT INTO election_positions
                        SET 
                            position_name = :position_name,
                            election_id = :election_id,
                            created_at = CURRENT_TIMESTAMP';
        
                        // Prepre Statement
                        $stmt = $db->prepare($query);
        
                        // Clean data
                        $data[0] = htmlspecialchars(strip_tags($data[0]));
                        $data[1] = htmlspecialchars(strip_tags($data[1]));
        
                        // Bind data
                        $stmt->bindParam(':position_name', $data[0]);
                        $stmt->bindParam(':election_id', $data[1]);
        
                        // Execute query
                        if($stmt->execute()){
                            echo(json_encode(array('status'=>'1', 'message'=>'Position has been added!')));
                        }
                    }
                }
            }
        }
        
        
    }

?>