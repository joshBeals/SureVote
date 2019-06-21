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
$query = "CREATE TABLE IF NOT EXISTS departments (
    dept_id INT(11) NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(255) NOT NULL,
    dept_email VARCHAR(255) NOT NULL,
    faculty_id INT(11),
    created_at DATETIME NOT NULL,
    PRIMARY KEY(dept_id),
    FOREIGN KEY (faculty_id) REFERENCES faculties(faculty_id)
)";

$stmt = $db->prepare($query);

if($stmt->execute()){
    $query = "SELECT * FROM departments WHERE faculty_id=$id";  

    // Prepared statement
    $stmt = $db->prepare($query);
    
    // Execute the statement
    if($stmt->execute()){
        $num = $stmt->rowCount();
        $arr = array();
        if($num > 0){
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                $dept = array(
                    'dept_id' => $dept_id,
                    'dept_name' => $dept_name,
                    'dept_email' => $dept_email,
                    'faculty_id' => $faculty_id,
                    'created_at' => $created_at
                );
                array_push($arr, $dept);
            }
            echo(json_encode($arr));
        }else{
            echo(json_encode($arr));
        }
    }
}


?>