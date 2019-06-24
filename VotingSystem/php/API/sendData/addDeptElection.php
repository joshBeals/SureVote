<?php

    // Headers
    // header('Access-Control-Allow-Origin: *');
    // header('Content-Type: application/json');
    // header('Access-Control-Allow-Methods: POST');
    // header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once('../../config/database.php');
    include_once('../../models/data.php');

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate blog post object
    $post = new Data($db); 

    if(isset($_POST)){
        $data = explode(",", $_POST['deptElection']);
        if($data[2] == 'none'){
            header('location: ..../templates/loginTemp.php');
        }else{
            if(($data[0] == '') || ($data[1] == '')){
                echo(json_encode(array('status'=>'0', 'message' => "All Fields are required!")));
            }else{
                $post->election_title = $data[0];
                $post->election_description = $data[1];
                $dept_id = $data[2];
                $post->addDeptElection($dept_id);
            }
        }
    }

?>