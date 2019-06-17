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

        $table = $logindetails[2];
        if($table = 'school_admins'){
            $val = 'school_id';
        }else if($table = 'faculty_admins'){
            $val = 'faculty_id';
        }else if($table = 'departments'){
            $val = 'dept_id';
        }

        $mysqli = new mysqli('localhost', 'root', '', 'e-voting') or die(mysqli_error($mysqli));
        
        $query1 = "SELECT COUNT(*) FROM ".$table." WHERE admin_name = '$username'";
        $query2 = "SELECT * FROM ".$table." WHERE admin_name = '$username'";
        $stmt = $mysqli->query($query1);
        $result = $mysqli->query($query2);
        $data = false;
        if($result){           
            while($row = $result->fetch_array()){
                $pass = password_verify($password, $row['admin_password']);
                if(password_verify($password, $row['admin_password'])){
                    $data = true; 
                    $id =  $row[$val];               
                }
            }

            if($data == true){
                session_start();
                $_SESSION['login'] = true;
                $array = array('status'=>'1', 'message'=>'Login Successful', 'school'=>$id);
                echo(json_encode($array));
            }else{
                $array = array('status'=>'0', 'message'=>'Invalid Login Details');
                echo(json_encode($array));
            }
        }else{
            $array = array('status'=>'0', 'message'=>"User isn't on the Database yet!");
            echo(json_encode($array));
        }
    }

?>