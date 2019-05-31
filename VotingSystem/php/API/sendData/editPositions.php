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
    $data = explode(',', $_POST['edit']);
    
    // Query Statement
    $query = "UPDATE election_positions SET position_name = '$data[0]' WHERE position_id = $data[1]";
    
    $stmt = $db->prepare($query);

    if($stmt->execute()){
        echo(json_encode(array('status'=>'1', 'message'=>'Position Edited Successfully!')));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'Position Not Edited!')));
    }
}else{
    echo(json_encode(array('status'=>'0', 'message'=>'Position Not Edited!')));
}

?>