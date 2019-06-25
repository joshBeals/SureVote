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
$id = $_GET['id'];

// Getting the data from the database
// Create Table
$query = "CREATE TABLE IF NOT EXISTS dept_election_candidates (
    candidate_id INT(11) NOT NULL AUTO_INCREMENT,
    candidate_name VARCHAR(255) NOT NULL,
    candidate_matric VARCHAR(255) NOT NULL,
    position_id INT(11),
    election_id INT(11),
    created_at DATETIME NOT NULL,
    PRIMARY KEY(candidate_id),
    FOREIGN KEY (election_id) REFERENCES dept_elections(election_id)
)";

$stmt = $db->prepare($query);

if($stmt->execute()){
    $query = "SELECT 
                dept_election_candidates.candidate_id,
                dept_election_candidates.candidate_name,
                dept_election_candidates.candidate_matric,
                dept_election_positions.position_id,
                dept_election_positions.position_name
            FROM
                (dept_election_candidates
            INNER JOIN
                dept_election_positions
            ON
                dept_election_candidates.position_id = dept_election_positions.position_id)
            WHERE
                dept_election_candidates.election_id = $id
            ORDER BY
                dept_election_positions.position_name DESC"; 

    // Prepared statement
    $stmt = $db->prepare($query);

    // Execute the statement
    if($stmt->execute()){
        $arr = array();
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            $pos = $row['position_id'];
            extract($row);
            $data = array(
                'candidate_id' => $candidate_id,
                'candidate_name' => $candidate_name,
                'candidate_matric' => $candidate_matric,
                'position_id' => $position_id,
                'position_name' => $position_name
            );
            array_push($arr, $data);
        }
        echo(json_encode($arr));
    }else{
        echo(json_encode($arr));
    }  
}else{
    echo(json_encode(array('No Posts Found')));
}


