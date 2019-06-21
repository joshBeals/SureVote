<?php
session_start();

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Including Database files
include_once('../../config/database.php');
include_once('../../models/data.php');

// Database connection
$database = new Database();
$db = $database->connect();

if(isset($_POST)){
    $data = explode(',', $_POST['editDept']);
    
    // Query Statement
    $query = "UPDATE 
                departments 
            SET 
                dept_name = '$data[0]',
                dept_email = '$data[1]'
            WHERE 
                dept_id = $data[2]";
    
    $stmt = $db->prepare($query);

    if($stmt->execute()){
        echo(json_encode(array('status'=>'1', 'message'=>'Department Edited Successfully!')));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'Department Not Edited!')));
    }
}else{
    echo(json_encode(array('status'=>'0', 'message'=>'Department Not Edited!')));
}

?>