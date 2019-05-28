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

    // Instantiate blog post object
    $post = new Data($db); 

    // Get raw posted data
    if(isset($_POST)){
        $data = explode(",", $_POST['arr']);
        if($data[2] == 'none'){
            header('location: ..../templates/loginTemp.php');
        }else{
            if(($data[0] == '') || ($data[1] == '')){
                echo(json_encode(array('status'=>'0', 'message' => "All Fields are required")));
            }else{
                $post->faculty_name = $data[0];
                $post->faculty_email = $data[1];
                $post->school_id = $data[2];

                // Create Faculty
                if($post->insertFaculty()){
                    $newFacultyEmail = explode('@', $data[0]);  
                    $adminUser = $newFacultyEmail[0];
                    $password = uniqid('', true);
                    $newPassword = explode('.', $password);
                    $adminPassword = end($newPassword);

                    // Creating the faculty_admins table.
                    $query = "CREATE TABLE IF NOT EXISTS faculty_admins (
                        admin_id INT(11) NOT NULL AUTO_INCREMENT,
                        admin_name VARCHAR(255) DEFAULT NULL,
                        admin_password TEXT(255) DEFAULT NULL,
                        school_id INT(11),
                        PRIMARY KEY (admin_id),
                        FOREIGN KEY (school_id) REFERENCES schools(school_id)
                    ) ";
                    $db->query($query);
                    $array = array('status'=>'1', 'message'=>'Registration Successful', 'adminusername'=>$newFacultyEmail[0], 'adminpassword'=>$adminPassword);
                    echo(json_encode($array)); 
                    $adminPassword = password_hash($adminPassword, PASSWORD_DEFAULT);
                    $query = "INSERT INTO faculty_admins (admin_name, admin_password, school_id) VALUES ('$adminUser', '$adminPassword', '$data[2]')";
                    $db->query($query);
                }else{
                    echo(json_encode(array('status'=>'0', 'message' => 'Registeration Terminated')));
                }
            }
        }
    }else{
        echo(json_encode(array('status'=>'0', 'message' => 'No data received')));
    }

?>