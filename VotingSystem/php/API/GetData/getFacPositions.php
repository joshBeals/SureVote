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

// Getting the data from the database
// Create Table
$query = "CREATE TABLE IF NOT EXISTS faculty_election_positions (
    position_id INT(11) NOT NULL AUTO_INCREMENT,
    position_name VARCHAR(255) NOT NULL,
    election_id INT(11),
    created_at DATETIME NOT NULL,
    PRIMARY KEY(position_id),
    FOREIGN KEY (election_id) REFERENCES faculty_elections(election_id)
)";

$stmt = $db->prepare($query);

if($stmt->execute()){
    $query = "SELECT * FROM faculty_election_positions WHERE election_id=$id";  

    // Prepared statement
    $stmt = $db->prepare($query);
    
    // Execute the statement
    if($stmt->execute()){
        $num = $stmt->rowCount();
        $arr = array();
        if($num > 0){
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $elect_pos = array(
                    'position_id' => $position_id,
                    'position_name' => $position_name,
                    'created_at' => $created_at,
                    'election_id' => $election_id
                );
                array_push($arr, $elect_pos);
            }
            echo(json_encode($arr));
        }else{
            echo(json_encode($arr));
        }
    }
}


?>