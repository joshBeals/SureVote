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

// Getting the school Details
$schData = $data->readSchools();
$TotFac = $data->readFaculties();
$facData = $data->readFaculty($id);

// Get number of schools
$numSch = $schData->rowCount();
$numFac = $facData->rowCount();
$TotFacData = $TotFac->rowCount();

// Sending number of schools
echo(json_encode(array('NumberOfSchools'=>$numSch, 'NumberOfFaculties'=>$numFac, 'TotalFaculties'=>$TotFacData)));

?>