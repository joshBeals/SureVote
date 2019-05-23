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

    // Checks if there's any school
    $school_arr = array();
    if($num > 0){
        while($row = $schData->fetch(PDO::FETCH_ASSOC)){
            array_push($school_arr, $row);
        }
        echo(json_encode($school_arr));
    }else{
        echo(json_encode(array('status'=>'0', 'message'=>'No Schools Found On Our Database')));
    }

?>