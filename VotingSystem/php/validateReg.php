<?php

    // IMPORTING THE DATABASE.PHP SCRIPT
    include_once('config/database.php');

    // CREATING AN INSTANCE OF THE DATABASE CONNECTION CLASS
    $database = new Database;
    $db = $database->connect();
    

    // REGISTERING NEW SCHOOLS ON THE PLATFORM
    if(isset($_POST)){
        $values = explode(",", $_POST['values']);
        $school_status = true;
        json_encode($values, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $school_name = $values[0];
        $school_email = $values[1];

        $query = "CREATE TABLE IF NOT EXISTS schools (
            school_id INT(11) NOT NULL AUTO_INCREMENT,
            school_name VARCHAR(255) NOT NULL,
            school_email VARCHAR(255) NOT NULL,
            school_status VARCHAR(100) NOT NULL,
            created_at DATETIME NOT NULL,
            PRIMARY KEY(school_id)
        )";
        
        $stmt = $db->query($query);


        if($stmt){
            if(($school_name == '') || ($school_email == '')){
                $array = array('status'=>'0', 'message'=>'Fields Must Not Be Empty');
                echo(json_encode($array));
            }else{
                $query1 = "SELECT * FROM schools WHERE school_name = '$school_name'";
                $query2 = "SELECT * FROM schools WHERE school_email = '$school_email'";
                $stmt1 = $db->query($query1);
                $stmt2 = $db->query($query2);
                $count1 = 0; $count2 = 0;
                while($row = $stmt1->fetch(PDO::FETCH_ASSOC)){
                    $count1++;
                }
                while($row = $stmt2->fetch(PDO::FETCH_ASSOC)){
                    $count2++;
                }
                if(($count1 > 0) && ($count2 <= 0)){
                    $array = array('status'=>'0', 'message'=>'School Exists Already!');
                    echo(json_encode($array));
                }elseif(($count1 <= 0) && ($count2 > 0)){
                    $array = array('status'=>'0', 'message'=>'Email Exists Already!');
                    echo(json_encode($array));
                }elseif(($count1 > 0) && ($count2 > 0)){
                    $array = array('status'=>'0', 'message'=>'School/Email Exists Already!', 'count1'=>$count1, 'count2'=>$count2);
                    echo(json_encode($array));
                }else{
                    $query = "INSERT INTO schools (school_name, school_email, school_status, created_at) VALUES ('$school_name', '$school_email', '$school_status', CURRENT_TIMESTAMP)";

                    $stmt = $db->query($query);
    
                    $newSchoolEmail = explode('@', $school_email);  
                    $adminUser = $newSchoolEmail[0];
                    $password = uniqid('', true);
                    $newPassword = explode('.', $password);
                    $adminPassword = end($newPassword);
    
    
                    $query = "SELECT * FROM schools WHERE school_name = '$school_name'";
                    $stmt = $db->query($query);
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                        $id = $row['school_id'];
                    }
                    $query = "CREATE TABLE IF NOT EXISTS school_admins (
                        admin_id INT(11) NOT NULL AUTO_INCREMENT,
                        admin_name VARCHAR(255) DEFAULT NULL,
                        admin_password TEXT(255) DEFAULT NULL,
                        school_id INT(11),
                        PRIMARY KEY (admin_id),
                        FOREIGN KEY (school_id) REFERENCES schools(school_id)
                    ) ";
                    $db->query($query);
                    $array = array('status'=>'1', 'message'=>'Registration Successful', 'adminusername'=>$newSchoolEmail[0], 'adminpassword'=>$adminPassword);
                    echo(json_encode($array)); 
                    $adminPassword = password_hash($adminPassword, PASSWORD_DEFAULT);
                    $query = "INSERT INTO school_admins (admin_name, admin_password, school_id) VALUES ('$adminUser', '$adminPassword', '$id')";
                    $db->query($query);
                }
            }
        }else{
            $array = array('status'=>'0', 'message'=>'Registration Terminated');
            echo(json_encode($array));
        }
    }

?>