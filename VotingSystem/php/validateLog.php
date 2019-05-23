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

        $mysqli = new mysqli('localhost', 'root', '', 'e-voting') or die(mysqli_error($mysqli));
        
        $query1 = "SELECT COUNT(*) FROM school_admins WHERE admin_name = '$username'";
        $query2 = "SELECT * FROM school_admins WHERE admin_name = '$username'";
        $stmt = $mysqli->query($query2);
        $result = $mysqli->query($query2);
        $data = false;
        if($result){           
            while($row = $stmt->fetch_array()){
                $pass = password_verify($password, $row['admin_password']);
                if(password_verify($password, $row['admin_password'])){
                    $data = true;                 
                }
            }

            if($data == true){
                $array = array('status'=>'1', 'message'=>'Login Successful');
                echo(json_encode($array));
            }else{
                $array = array('status'=>'0', 'message'=>'Invalid Login Details');
                echo(json_encode($array));
            }
        }else{
            $array = array('status'=>'0', 'message'=>'Your School isnt on the Database yet!');
            echo(json_encode($array));
        }
    }

?>