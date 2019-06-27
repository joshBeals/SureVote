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

    if(isset($_POST)){

        $data = explode(',', $_POST['text']);
        
        $query = "SELECT * FROM faculty_admins WHERE faculty_id = $data[2]";
        $stmt = $db->prepare($query);
        if($stmt->execute()){
           $row = $stmt->fetch(PDO::FETCH_ASSOC);
           $pass = password_verify($data[0], $row['admin_password']);
                if(password_verify($data[0], $row['admin_password'])){
                    $newPass = password_hash($data[1], PASSWORD_DEFAULT);
                    $query = "UPDATE faculty_admins set admin_password='$newPass' WHERE faculty_id=$data[2]";
                    $stmt = $db->prepare($query);
                    if($stmt->execute()){
                        $array = array('status'=>'1', 'message'=>"Password Changed!");
                        echo(json_encode($array));
                    }else{
                        $array = array('status'=>'0', 'message'=>"Password Not Changed!");
                        echo(json_encode($array));
                    }
                }else{
                    $array = array('status'=>'0', 'message'=>"Old Password Not Correct!");
                    echo(json_encode($array));
                }
        }else{
            $array = array('status'=>'0', 'message'=>"Password Not Changed!");
            echo(json_encode($array));
        }
    }

?>