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
    $data = explode(',', $_POST['editFacElec']);
    
    // Query Statement
    $query = "UPDATE 
                faculty_elections 
            SET 
                election_title = '$data[0]',
                election_description = '$data[1]'
            WHERE 
                election_id = $data[2]";
    
    $stmt = $db->prepare($query);

    if($stmt->execute()){
        echo(json_encode(array('status'=>'1', 'message'=>'Election Edited Successfully!')));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'Election Not Edited!')));
    }
}else{
    echo(json_encode(array('status'=>'0', 'message'=>'Election Not Edited!')));
}

?>