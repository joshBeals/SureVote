<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC|Fresca|Muli|Oleo+Script+Swash+Caps|Pacifico|Philosopher|Viga&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/landing.css">
    <title>SureVote</title>
</head>
<body>
    <div class="container">
        <div class="wrapper">
            <div class="header">
                <div class="logo">
                <?php 
                    // session_start();
                    // if(isset($_SESSION['login'])){
                    //     echo($_SESSION['login']);
                    // }else{
                    //     echo('No session');
                    // }    
                ?>
                    SureVote
                </div>
                <div class="menu">
                </div>
            </div>
            <div class="content">
                <div class='first'>
                    <h3>Welcome To <span>SureVote</span></h3>
                    <p>
                        No.1 Voting App for Schools in Nigeria.
                        This App was developed by a student of the department of Computer Science And Information Technology, Bowen University. Iwo, Osun State. For the main purpose of automating school election processes. This WebApp was developed using HTML, CSS, Bootstrap, JavaScript, AJAX, PHP, MySQL.
                    </p>
                    <button>Sign Up</button>
                </div>
                <div class='second'>
                    <div class="main">
                        <div class="box school" id="school">
                            <a href="loginTemp.php?role=101"></a>
                            <i class="fas fa-school"></i> 
                            <div>
                                <h4>School</h4>
                                <p>Login as a school</p>
                            </div>
                        </div>
                        <div class="box faculty" id="faculty">
                            <a href="loginTemp.php?role=202"></a>
                            <i class="fas fa-landmark"></i>
                            <div>
                                <h4>Faculty</h4>
                                <p>Login as a faculty</p>
                            </div>
                        </div>
                        <div class="box dept" id="dept">
                            <a href="loginTemp.php?role=303"></a>
                            <i class="fas fa-building"></i> 
                            <div>
                                <h4>Department</h4>
                                <p>Login as a department</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../javascript/landing.js"></script>
</body>
</html>