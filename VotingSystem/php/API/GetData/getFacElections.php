<?php
session_start();
$id = $_GET['id'];
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Including Database files
include_once('../../config/database.php');
include_once('../../models/data.php');

// Database connection
$database = new Database();
$db = $database->connect();

// Creating an object of the Data class
$data = new Data($db);

// Calling the readElections function
$elections = $data->readFacElections($id);

// Getting the number of elections created
$num = $elections->rowCount();
$arr = array();
if($num > 0){

    while($row = $elections->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        $elect_item = array(
            'election_id' => $election_id,
            'election_title' => $election_title,
            'election_description' => $election_description,
            'created_at' => $created_at,
            'faculty_id' => $faculty_id
        );
        array_push($arr, $elect_item);
    }

    echo(json_encode($arr));
}else{
    echo(json_encode($arr));
}

?>