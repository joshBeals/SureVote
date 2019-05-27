<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC|Fauna+One|Gentium+Book+Basic|Josefin+Slab|Kodchasan|Lato|Macondo+Swash+Caps|Rubik|Stylish|Yeon+Sung&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/schoolAdmin.css">
    <title>SchoolAdmin</title>
</head>
<body>
    <?php
    session_start();
    if(!isset($_GET['school'])){
        session_unset();
    }
    if(!isset($_SESSION['login'])){
        header('location: ../loginTemp.php');
    }
    ?>

    <div class="cont">
        <div class="sidebar show" id="sidebar">
            <!--Dashboard-->
            <div class="dashboard" id="dashboard">
                <h3>Admin Dashboard</h3>
            </div>
            <!--Registration Division-->
            <div class="division registrations hidebackground" id='reg'>
                <div class="holder" id='regclick'>
                    <i class="fas fa-user-plus"></i> 
                    <h4>Registrations</h4>
                    <p id='regdrop' class='hidedrop'></p>
                </div>
                <ul class='hide' id='regul'>
                    <li class="dropdown">
                        <i class="fas fa-school"></i> 
                        <p id="registerFaculty">Register Faculty</p>
                    </li>
                </ul>       
            </div>
            <!--Voting Division-->
            <div class="division voting hidebackground" id='vote'>
                <div class="holder" id='voteclick'>
                    <i class="fas fa-poll"></i>
                    <h4>Voting</h4>
                    <p id='votedrop' class='hidedrop'></p>
                </div>
                <ul  class='hide' id='voteul'>
                    <li class="dropdown">
                        <i class="fas fa-person-booth"></i>
                        <p id="viewVoters">View Voters</p>
                    </li>
                    <li class="dropdown">
                        <i class="far fa-plus-square"></i>
                        <p id="addElection">Add an election</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-list-ol"></i> 
                        <p id="votingList">Voting list</p>
                    </li>
                    <li class="dropdown">
                        <i class="far fa-plus-square"></i> 
                        <p id="addVoter">Add a voter</p>
                    </li>
                </ul>         
            </div>
            <!--Change Password Division-->
            <div class="division changepass">
                <div class="holder">
                    <i class="fas fa-lock"></i> 
                    <h4 id="changepassword">Change Password</h4>
                </div>
            </div>
            <!--Settings Division-->
            <div class="division settings">
                <div class="holder">
                    <i class="fas fa-cog"></i>
                    <h4 id="settings">Settings</h4>
                </div>
            </div>
            <!--Sign Out Division-->
            <div class="division signout">
                <div class="holder">
                    <i class="fas fa-sign-out-alt"></i>
                    <h4 id="signout"><a href='schoolAdmin.php'>Sign Out</a></h4>
                </div>
            </div>
        </div>
        <!--Main Content-->
        <div class="main">
            <!--Top of main-->
            <div class="top">
                <div class="topLeft">
                    <h2>Overview</h2>
                    <p>Welcome Back,</p>
                </div>
                <i class="fas fa-bars" id="menuToogle"></i>
            </div>
            <!--Content of main-->
            <div class="hideTemp" id="content">
                <!--Main Dash-->
                <div class="mainDash">
                    <div class="analysis">
                        <div class="boxes" id="faculties">
                            <i class="fas fa-school"></i> 
                            <div class="info">
                                <h2 id='facultiesRegistered'>0</h2>
                                <p>Faculties Registered</p>
                            </div>
                        </div>
                        <div class="boxes" id="departments">
                            <i class="far fa-building"></i> 
                            <div class="info">
                                <h2 id='departmemtsRegistered'>0</h2>
                                <p>Departments Registered</p>
                            </div>
                        </div>
                        <div class="boxes" id="elections">
                            <i class="fas fa-poll-h"></i> 
                            <div class="info">
                                <h2 id='ElectionsConducted'>0</h2>
                                <p>Elections Conducted</p>
                            </div>
                        </div>
                        <div class="boxes" id="voters">
                             <i class="fas fa-user-check"></i>
                             <div class="info">
                                <h2 id='RegisteredVoters'>0</h2>
                                <p>Registered Voters</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--Main Pic-->
                <div class="pic">
                    <div class="left">
                        <?php
                            include_once('vendors/carousel.php');
                        ?>
                    </div>
                    <div class="right">
                        <div class="first">
                            <div class="cards">
                                <i class="fas fa-landmark"></i>
                                <div class="info">
                                    <h2 id='SchoolsRegistered'>0</h2>
                                    <p>Schools On The Platform</p>
                                </div>
                            </div>
                            <div class="cards">
                                <i class="fas fa-users"></i>
                                <div class="info">
                                    <h2 id='TotalAppUsers'>0</h2>
                                    <p>Total App Users</p>
                                </div>
                            </div>
                        </div>
                        <div class="second">
                            <div class="cards">
                                <i class="fas fa-person-booth"></i>
                                <div class="info">
                                    <h2 id='VotedNumbers'>0</h2>
                                    <p>Voted Numbers</p>
                                </div>
                            </div>
                            <div class="cards">
                                <i class="fas fa-play"></i>
                                <div class="info">
                                    <h2 id='ElectionsStarted'>0</h2>
                                    <p>Elections Started</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--Faculty Registration Form-->
            <div class="hideTemp" id="f_reg">
                <div class="fff">
                <div class="left">
                    <div>
                    Register Faculties under your school here.
                    These would enable the reistered faculties conduct 
                    their sub elections without disturbing the school authority
                    </div>
                </div>
                <div class="right">
                    <div>
                    <h3>Register Faculty on SureVote</h3>
                    <form action="" method="POST">
                        <input type="hidden" id="school_id" value=
                        <?php 
                        if (isset($_GET['school'])){
                            echo($_GET['school']);
                        }else{
                            session_unset();
                        }
                        ?>>
                        <label for="faculty_name">Faculty Name</label>
                        <input type="text" name="faculty_name" id="faculty_name" required>
                        <label for="faculty_email">Faculty Email</label>
                        <input type="email" name="faculty_email" id="faculty_email" required>
                        <input type="submit" name="register" value="Register" id="RegisterBtn">
                    </form>
                    <p>Do you have an account? <a href="">LOGIN</a></p>   
                    </div>
                </div>
                </div>
            </div>

            <!--Add Election-->
            <div class="showTemp" id="AddElection">
                <div class="comb">
                    <div class="left">
                        <h5>Add Election</h5>
                        <form action="" method="POST">
                           <div class="norm">
                                <label for="title">Title</label>
                                <input type="text" name="title" id="title" required>
                           </div>
                           <div class="notnorm">
                                <label for="descrip">Description</label>
                                <textarea rows="6" cols="0" id="descrip">
                                </textarea>
                           </div>
                        </form>
                    </div>
                    <div class="right">
                    
                    </div>
                </div>
            </div>

            <!--Main Content-->
            <div class="footer">
                <?php
                    include_once('vendors/footer.php');
                ?>
            </div>
        </div>


        <div class="modal" id="modal">
            <div class="inner" id="inner">
                
            </div>
        </div>
    </div>

    <script src="DashboardJS/schoolAdmin.js"></script>
    <script src="DashboardJS/AdminAPI.js"></script>
</body>
</html>