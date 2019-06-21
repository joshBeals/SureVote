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
$query = "CREATE TABLE IF NOT EXISTS election_candidates (
    candidate_id INT(11) NOT NULL AUTO_INCREMENT,
    candidate_name VARCHAR(255) NOT NULL,
    candidate_matric VARCHAR(255) NOT NULL, 
    faculty_id INT(11),
    dept_id INT(11),
    position_id INT(11),
    election_id INT(11),
    created_at DATETIME NOT NULL,
    PRIMARY KEY(candidate_id),
    FOREIGN KEY (election_id) REFERENCES school_elections(election_id)
)";

$stmt = $db->prepare($query);

if($stmt->execute()){
    $query = "SELECT 
                election_candidates.candidate_id,
                election_candidates.candidate_name,
                election_candidates.candidate_matric, 
                election_candidates.faculty_id, 
                faculties.faculty_name,
                departments.dept_name,
                election_candidates.dept_id, 
                election_positions.position_id,
                election_positions.position_name
            FROM
                ((election_candidates
            INNER JOIN
                election_positions
            ON
                election_candidates.position_id = election_positions.position_id)
            INNER JOIN
                faculties
            ON
                election_candidates.faculty_id = faculties.faculty_id)
            INNER JOIN
                departments
            ON
                election_candidates.dept_id = departments.dept_id
            WHERE
                election_candidates.election_id = $id
            ORDER BY
                election_positions.position_name DESC"; 

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
                'faculty_id' => $faculty_id,
                'faculty_name' => $faculty_name,
                'dept_id' => $dept_id,
                'dept_name' => $dept_name,
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


