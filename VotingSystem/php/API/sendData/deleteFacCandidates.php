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
    $query = "DELETE FROM faculty_election_candidates WHERE candidate_id=$data";
    
    $stmt = $db->prepare($query);

    if($stmt->execute()){
        echo(json_encode(array('status'=>'1', 'message'=>'Candidate Deleted Successfully!')));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'Candidate Not Deleted!')));
    }
}else{
    echo(json_encode(array('status'=>'0', 'message'=>'Candidate Not Deleted!')));
}

?>