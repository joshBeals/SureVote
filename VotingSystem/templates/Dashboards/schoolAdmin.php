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
    <div class="cont">
        <div class="sidebar show" id="sidebar">
            <!--Dashboard-->
            <div class="dashboard">
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
                        <p>Register Faculty</p>
                    </li>
                    <li class="dropdown">
                        <i class="far fa-building"></i> 
                        <p>Register Department</p>
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
                        <p>View Voters</p>
                    </li>
                    <li class="dropdown">
                        <i class="far fa-plus-square"></i>
                        <p>Add an election</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-list-ol"></i> 
                        <p>Voting list</p>
                    </li>
                    <li class="dropdown">
                        <i class="far fa-plus-square"></i> 
                        <p>Add a voter</p>
                    </li>
                </ul>         
            </div>
            <!--Change Password Division-->
            <div class="division changepass">
                <div class="holder">
                    <i class="fas fa-lock"></i> 
                    <h4>Change Password</h4>
                </div>
            </div>
            <!--Settings Division-->
            <div class="division settings">
                <div class="holder">
                    <i class="fas fa-cog"></i>
                    <h4>Settings</h4>
                </div>
            </div>
            <!--Sign Out Division-->
            <div class="division signout">
                <div class="holder">
                    <i class="fas fa-sign-out-alt"></i>
                    <h4>Sign Out</h4>
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
            <div class="content">
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
            <div class="f_reg">
                <div class="left">

                </div>
                <div class="right">

                </div>
            </div>

            <!--Main Content-->
            <div class="footer">
                <?php
                    include_once('vendors/footer.php');
                ?>
            </div>
        </div>
    </div>

    <script src="DashboardJS/schoolAdmin.js"></script>
    <script src="DashboardJS/AdminAPI.js"></script>
</body>
</html>