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
$query = "CREATE TABLE IF NOT EXISTS faculties (
    faculty_id INT(11) NOT NULL AUTO_INCREMENT,
    faculty_name VARCHAR(255) NOT NULL,
    faculty_email VARCHAR(255) NOT NULL,
    school_id INT(11),
    created_at DATETIME NOT NULL,
    PRIMARY KEY(faculty_id),
    FOREIGN KEY (school_id) REFERENCES schools(school_id)
)";

$stmt = $db->prepare($query);

if($stmt->execute()){
    $query = "SELECT * FROM faculties WHERE school_id=$id";  

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
                    'faculty_id' => $faculty_id,
                    'faculty_name' => $faculty_name,
                    'faculty_email' => $faculty_email,
                    'school_id' => $school_id,
                    'created_at' => $created_at
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