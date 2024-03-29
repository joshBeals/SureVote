<?php

    // IMPORTING THE DATABASE.PHP SCRIPT
    include_once('config/database.php');

    // CREATING AN INSTANCE OF THE DATABASE CONNECTION CLASS
    $database = new Database;
    $db = $database->connect();

    // LOGGING INTO THE SCHOOL'S ADMIN DASHBOARD
    if(isset($_POST)){
        $logindetails = explode(",", $_POST['logindetails']);
        json_encode($logindetails, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $username = $logindetails[0];
        $password = $logindetails[1];
        $role = $logindetails[2];
        
        if($role == 101){
            $role = 'school_admins';    
        }else if($role == 202){
            $role = 'faculty_admins';
        }else if($role == 303){
            $role = 'dept_admins';
        }
        
        $val = explode('_', $role);
        $value = $val[0] .= '_id';

        $mysqli = new mysqli('localhost', 'root', '', 'e-voting') or die(mysqli_error($mysqli));
        $query1 = "SELECT COUNT(*) FROM ".$role." WHERE admin_name = '$username'";
        $query2 = "SELECT * FROM ".$role." WHERE admin_name = '$username'";
        $stmt = $mysqli->query($query1);
        $result = $mysqli->query($query2);
        $data = false;
        $id = 0;
        if($result){           
            while($row = $result->fetch_array()){
                $pass = password_verify($password, $row['admin_password']);
                if(password_verify($password, $row['admin_password'])){
                    $data = true; 
                    $id =  $row[$value];             
                }
            }

            if($data == true){
                session_start();
                $_SESSION['login'] = true;
                $_SESSION['id'] = $id;
                $array = array('status'=>'1', 'message'=>'Login Successful', 'id'=>$id, 'role'=>$logindetails[2]);
                echo(json_encode($array));
            }else{
                $array = array('status'=>'0', 'message'=>'Invalid Login Details!');
                echo(json_encode($array));
            }
        }else{
            $array = array('status'=>'0', 'message'=>"Invalid Login Details!");
            echo(json_encode($array));
        }
    }

?>