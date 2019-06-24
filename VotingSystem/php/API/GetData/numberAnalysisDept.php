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

$query = "SELECT 
            departments.faculty_id,
            faculties.school_id
        From 
            departments
        INNER JOIN 
            faculties
        ON
            departments.faculty_id = faculties.faculty_id
        WHERE dept_id=".$id;
$stmt = $db->prepare($query);
if($stmt->execute()){
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $query1 = $row['faculty_id'];
        $query2 = $row['school_id'];
    }
}

// Getting the school Details
$schData = $data->readSchools();
$TotFac = $data->readFaculties();
$deptData = $data->readDepartment($id);
$ElecCr = $data->readElections($query2);
$FacElecCr = $data->readFacElections($query1);
$TotdeptData = $data->readDepts();
$DeptElecCr = $data->readDeptElections($id);

// Get number of schools
$numSch = $schData->rowCount();
$numDept = $deptData->rowCount();
$TotFacData = $TotFac->rowCount();
$TotalDept = $TotdeptData->rowCount();
$ElecCreated = $ElecCr->rowCount();
$FacElecCreated = $FacElecCr->rowCount();
$DeptElecCreated = $DeptElecCr->rowCount();

// Sending number of schools
echo(json_encode(array('NumberOfSchools'=>$numSch, 'NumberOfDeptElectionsCreated'=>$DeptElecCreated, 'TotalFaculties'=>$TotFacData, 'NumberOfElectionsCreated'=>$ElecCreated, 'NumberOfFacElectionsCreated'=>$FacElecCreated, 'TotalDepts'=>$TotalDept)));

?>