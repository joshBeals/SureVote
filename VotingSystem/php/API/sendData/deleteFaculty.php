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
    $data = $_POST['delete'];
    
    // Query Statement
    $query = "DELETE FROM faculties WHERE faculty_id=$data";
    
    $stmt = $db->prepare($query);

    if($stmt->execute()){
        echo(json_encode(array('status'=>'1', 'message'=>'Faculty Deleted Successfully!')));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'Faculty Not Deleted!')));
    }
}else{
    echo(json_encode(array('status'=>'0', 'message'=>'Faculty Not Deleted!')));
}

?>