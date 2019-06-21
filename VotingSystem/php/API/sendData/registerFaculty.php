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
        }
        if(($data[0] == '') || ($data[1] == '')){
            echo(json_encode(array('status'=>'0', 'message' => "All Fields are required")));      
        }else{
            $query = "CREATE TABLE IF NOT EXISTS faculties (
                faculty_id INT(11) NOT NULL AUTO_INCREMENT,
                faculty_name VARCHAR(255) NOT NULL,
                faculty_email VARCHAR(255) NOT NULL,
                school_id INT(11),
                created_at DATETIME NOT NULL,
                PRIMARY KEY(faculty_id),
                FOREIGN KEY (school_id) REFERENCES schools(school_id)
            )";
            $stmt = $db->prepare($query);

            if($stmt->execute()){
                $query1 = "SELECT * FROM faculties WHERE faculty_name='$data[0]'";
                $query2 = "SELECT * FROM faculties WHERE faculty_email='$data[1]'";
                $stmt1 = $db->query($query1);
                $stmt2 = $db->query($query2);
                $count1 = $stmt1->rowCount();
                $count2 = $stmt2->rowCount();
                if(($count1 > 0) && ($count2 <= 0)){
                    $array = array('status'=>'0', 'message'=>'Faculty Exists Already!');
                    echo(json_encode($array));
                }elseif(($count1 <= 0) && ($count2 > 0)){
                    $array = array('status'=>'0', 'message'=>'Email Exists Already!');
                    echo(json_encode($array));
                }elseif(($count1 > 0) && ($count2 > 0)){
                    $array = array('status'=>'0', 'message'=>'Faculty/Email Exists Already!');
                    echo(json_encode($array));
                }else{
                    $post->faculty_name = $data[0];
                    $post->faculty_email = $data[1];
                    $post->school_id = $data[2];
                    // Create Faculty
                    $facID = $post->insertFaculty();
                    if($facID != 0){
                        $newFacultyEmail = explode('@', $data[1]);  
                        $adminUser = $newFacultyEmail[0];
                        $password = uniqid('', true);
                        $newPassword = explode('.', $password);
                        $adminPassword = end($newPassword);
    
                        // Creating the faculty_admins table.
                        $query = "CREATE TABLE IF NOT EXISTS faculty_admins (
                            admin_id INT(11) NOT NULL AUTO_INCREMENT,
                            admin_name VARCHAR(255) DEFAULT NULL,
                            admin_password TEXT(255) DEFAULT NULL,
                            faculty_id INT(11),
                            PRIMARY KEY (admin_id),
                            FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
                        ) ";
                        $db->query($query);
                        $array = array('status'=>'1', 'message'=>'Registration Successful', 'adminusername'=>$newFacultyEmail[0], 'adminpassword'=>$adminPassword);
                        echo(json_encode($array)); 
                        $adminPassword = password_hash($adminPassword, PASSWORD_DEFAULT);
                        $query = "INSERT INTO faculty_admins (admin_name, admin_password, faculty_id) VALUES ('$adminUser', '$adminPassword', '$facID')";
                        $db->query($query);
                    }else{
                        echo(json_encode(array('status'=>'0', 'message' => 'Registeration Terminated')));
                    }
                }
            }
        }
    }else{
        echo(json_encode(array('status'=>'0', 'message' => 'No data received')));
    }

?>