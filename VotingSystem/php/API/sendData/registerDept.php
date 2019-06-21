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

    // Get raw posted data
    if(isset($_POST)){
        $data = explode(",", $_POST['arr']);
        if($data[2] == 'none'){
            header('location: ..../templates/loginTemp.php');
        }
        if(($data[0] == '') || ($data[1] == '')){
            echo(json_encode(array('status'=>'0', 'message' => "All Fields are required")));
        }else{
            $query1 = "SELECT * FROM departments WHERE dept_name='$data[0]'";
            $query2 = "SELECT * FROM departments WHERE dept_email='$data[1]'";
            $stmt1 = $db->query($query1);
            $stmt2 = $db->query($query2);
            $count1 = $stmt1->rowCount();
            $count2 = $stmt2->rowCount();
            if(($count1 > 0) && ($count2 <= 0)){
                $array = array('status'=>'0', 'message'=>'Department Exists Already!');
                echo(json_encode($array));
            }elseif(($count1 <= 0) && ($count2 > 0)){
                $array = array('status'=>'0', 'message'=>'Email Exists Already!');
                echo(json_encode($array));
            }elseif(($count1 > 0) && ($count2 > 0)){
                $array = array('status'=>'0', 'message'=>'Department/Email Exists Already!', 'count1'=>$count1, 'count2'=>$count2);
                echo(json_encode($array));
            }else{
                $post->dept_name = $data[0];
                $post->dept_email = $data[1];
                $post->faculty_id = $data[2];

                // Create Dept
                $deptID = $post->insertDept();
                if($deptID != 0){
                    $newDeptEmail = explode('@', $data[1]);  
                    $adminUser = $newDeptEmail[0];
                    $password = uniqid('', true);
                    $newPassword = explode('.', $password);
                    $adminPassword = end($newPassword);

                    // Creating the Dept_admins table.
                    $query = "CREATE TABLE IF NOT EXISTS dept_admins (
                        admin_id INT(11) NOT NULL AUTO_INCREMENT,
                        admin_name VARCHAR(255) DEFAULT NULL,
                        admin_password TEXT(255) DEFAULT NULL,
                        dept_id INT(11),
                        PRIMARY KEY (admin_id),
                        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
                    ) ";
                    $db->query($query);
                    $array = array('status'=>'1', 'message'=>'Registration Successful', 'adminusername'=>$newDeptEmail[0], 'adminpassword'=>$adminPassword);
                    echo(json_encode($array)); 
                    $adminPassword = password_hash($adminPassword, PASSWORD_DEFAULT);

                    $query = "INSERT INTO dept_admins (admin_name, admin_password, dept_id) VALUES ('$adminUser', '$adminPassword', '$deptID')";
                    $db->query($query);
                }else{
                    echo(json_encode(array('status'=>'0', 'message' => 'Registeration Terminated')));
                }
            }
        }
    }else{
        echo(json_encode(array('status'=>'0', 'message' => 'No data received')));
    }

?>