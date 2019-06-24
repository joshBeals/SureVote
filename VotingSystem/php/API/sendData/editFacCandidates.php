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
    $data = explode(',', $_POST['editCand']);
    
    // Query Statement
     // Query Statement
     $query = "UPDATE 
                faculty_election_candidates 
            SET 
                candidate_name = '$data[0]',
                candidate_matric = '$data[1]',
                dept_id = $data[2],
                position_id = $data[3]
            WHERE 
                candidate_id = $data[4]";
    
    $stmt = $db->prepare($query);

    if($stmt->execute()){
        echo(json_encode(array('status'=>'1', 'message'=>'Candidate Updated Successfully!')));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'Candidate Not Updated!')));
    }
}else{
    echo(json_encode(array('status'=>'0', 'message'=>'Candidate Not Updated!')));
}

?>