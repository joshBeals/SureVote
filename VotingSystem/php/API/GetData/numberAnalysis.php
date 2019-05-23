<?php

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

// Get number of schools
$num = $schData->rowCount();

// Sending number of schools
echo(json_encode(array('NumberOfSchools'=>$num)));

?>