<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC|Pacifico|Fauna+One|Gentium+Book+Basic|Josefin+Slab|Kodchasan|Lato|Macondo+Swash+Caps|Rubik|Stylish|Yeon+Sung&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/AdminDash.css">
    <title>SchoolAdmin</title>
</head>
<body>
    <?php
    session_start();
    if(!isset($_GET['school']) || ($_GET['school'] != $_SESSION['id'])){
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
                <h5>School's Dashboard</h5>
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
                    <li class="dropdown">
                        <i class="far fa-eye"></i>
                        <p id="viewFaculty">View Faculties</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-building"></i> 
                        <p id="registerDept">Register Department</p>
                    </li>
                    <li class="dropdown">
                        <i class="far fa-eye"></i>
                        <p id="viewDept">View Departments</p>
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
                        <i class="far fa-plus-square"></i>
                        <p id="addElection">Add an election</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-user-tag"></i>
                        <p id="addPositions">Add Positions</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-list-ol"></i> 
                        <p id="votingList">Election list</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-person-booth"></i>
                        <p id="viewVoters">View Voters</p>
                    </li>
                </ul>         
            </div>
            <div class="division cand hidebackground" id='cand'>
                <div class="holder" id='candclick'>
                    <i class="fas fa-users"></i>
                    <h4>Candidates</h4>
                    <p id='canddrop' class='hidedrop'></p>
                </div>
                <ul  class='hide' id='candul'>
                    <li class="dropdown">
                        <i class="far fa-plus-square"></i>
                        <p id="addCandidates">Add Candidates</p>
                    </li>
                    <li class="dropdown">
                        <i class="fas fa-portrait"></i>
                        <p id="viewCandidates">View Candidates</p>
                    </li>
                </ul>
            </div>
            <!--Result Division-->
            <div class="division result">
                <div class="holder">
                 <i class="far fa-file"></i> 
                    <h4 id="ResultBlock">Results Block</h4>
                </div>
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
                    <h4 id="signout"><a href='AdminDash.php'>Sign Out</a></h4>
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
            <div class="showTemp" id="content">
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
                                <h2 id='departmentsRegistered'>0</h2>
                                <p>Departments Registered</p>
                            </div>
                        </div>
                        <div class="boxes" id="elections">
                            <i class="fas fa-poll-h"></i> 
                            <div class="info">
                                <h2 id='ElectionsConducted'>0</h2>
                                <p>Elections Created</p>
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
            <!--View Faculty Registration Form-->
            <div class="hideTemp" id="f_regV">
                <div class="ffv">
                    <h4>Faculties List</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Faculty Name</th>
                            <th>Faculty Email</th>
                            <th>Created at</th>
                            <th colspan="3">Operations</th>
                        </tr>
                        </thead>
                        <tbody id='tbodyF'>

                        </tbody>
                    </table>
                </div> 
            </div>

            <!--View Department Registration Form-->
            <div class="hideTemp" id="d_regV">
                <div class="ffv">
                    <h4>Department List</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Department Name</th>
                            <th>Department Email</th>
                            <th>Faculty Name</th>
                            <th>Created at</th>
                            <th colspan="3">Operations</th>
                        </tr>
                        </thead>
                        <tbody id='tbodyD'>

                        </tbody>
                    </table>
                </div> 
            </div>

            <!--Faculty Registration Form-->
            <div class="hideTemp" id="f_reg"id="f_reg">
                <div class="fff">
                <div class="left">
                    <div>
                    Register Faculties under your school here.
                    These would enable the registered faculties conduct 
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
                    <p>Do you have an account? <a href="../loginTemp.php">LOGIN</a></p>   
                    </div>
                </div>
                </div>
            </div>

            <!--Department Registration Form-->
            <div class="hideTemp" id="d_reg"id="d_reg">
                <div class="fff">
                <div class="left">
                    <div>
                    Register Departments under your school here.
                    These would enable the registered departments conduct 
                    their sub elections without disturbing the school authority
                    </div>
                </div>
                <div class="right">
                    <div>
                    <h3>Register Departments on SureVote</h3>
                    <form action="" method="POST">
                        <input type="hidden" id="school_id" value=
                        <?php 
                        if (isset($_GET['school'])){
                            echo($_GET['school']);
                        }else{
                            session_unset();
                        }
                        ?>>
                        <label for="dept_name">Department Name</label>
                        <input type="text" name="dept_name" id="dept_name" required>
                        <label for="dept_email">Department Email</label>
                        <input type="email" name="dept_email" id="dept_email" required>
                        <label for="fac">Faculty Name</label>
                        <select id="fac"></select>
                        <input type="submit" name="register" value="Register" id="RegisterBtn1">
                    </form>
                    <p>Do you have an account? <a href="../loginTemp.php">LOGIN</a></p>   
                    </div>
                </div>
                </div>
            </div>

            <!--Add Election-->
            <div class="hideTemp" id="AddElection">
                <div class="comb">
                    <div class="left">
                        <h5>Add Election</h5>
                        <form action="" method="POST">
                        <input type="hidden" id="sch_id" value=
                        <?php 
                        if (isset($_GET['school'])){
                            echo($_GET['school']);
                        }else{
                            session_unset();
                        }
                        ?>>
                           <div class="norm">
                                <label for="title">Title</label>
                                <input type="text" name="title" id="title" required>
                           </div>
                           <div class="notnorm">
                                <label for="descrip">Description</label>
                                <textarea rows="3" id="descrip"></textarea>
                           </div>
                           <input type="submit" name="addElec" value="Add Election" id="addElec">
                        </form>
                    </div>
                    <div class="right">
                        <h5>Additional Background</h5>
                        <div class="backpic">
                            <div class="backwrap">
                                <h1>16 x 6</h1>
                            </div>
                        </div>
                        <button>Upload</button>
                    </div>
                </div>
            </div>

            <!--View Elections Added-->
            <div class="hideTemp" id="viewElections">
                <div class="elecAdded">
                    <h4>Election List</h4>
                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th colspan="3">Operations</th>
                        </tr>
                        </thead>
                        <tbody id='tbody'>

                        </tbody>
                    </table>
                </div>
            </div>

            <!--Add Positions-->
            <div class="hideTemp" id="positions">
                <div class="posInner">
                    <div class="left">
                        <div class="header">
                            <h4>Add Positions</h4>
                            <div class="listBox">
                                Choose Election :
                                <select name="elect" id="electList" onchange='showData()'>
                                </select>
                            </div>
                            <button class="btn btn-primary btn-sm" id="addP">Continue</button>
                        </div>
                        <div class="hide" id="posContent">
                            <div class="texts">
                                <input type="text" id="posTxt" placeholder="Enter Position...">
                                <input type="button" value="Add" id="posBtn">
                            </div>
                            <div class="display">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Position</th>
                                        <th>Created at</th>
                                        <th colspan="2">Operations</th>
                                    </tr>
                                    </thead>
                                    <tbody id='tbody1'>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                    
            </div>
            
            <!--Add Candidates-->
            <div class="hideTemp" id="candidates">
                <div class="innerCand">
                    <div class="left">
                        <h4>Additional Photo</h4>
                        <div class='hide'>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.82c3db4f50de8346c088cecde6567bef.1559547720400.1559547720400.1559547720400.1&__hssc=57440181.1.1559547720401&__hsfp=2374548094" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                        <div class="img">
                            <img src="../app_images/user.svg" alt="dsf">
                        </div>
                        <button class='btn btn-info' id='uploadBtn'>Upload</button>
                    </div>
                    <div class="right">
                        <h4>Candidate Registeration</h4>
                        <h6>Candidate Name (FullName)</h6>
                        <input type="text" id="candName">
                        <h6>Candidate Matric No.</h6>
                        <input type="text" id="candMatric">
                        <h6>Faculty</h6>
                        <select id="candFac" onchange='showDept()'></select>
                        <h6>Department</h6>
                        <select id="candDept"></select>
                        <h6>Election</h6>
                        <select id="candElec" onchange='showPos()'></select>
                        <h6>Position</h6>
                        <select id="candpos"></select>
                        <button class='btn btn-info' id='addCand'>Add Candidate</button>
                    </div>
                </div>
            </div>

            <!--View Candidates-->
            <div class="hideTemp" id="viewCand">
                <div class="candInner">
                    <div class="left">
                        <div class="header">
                            <h4>View Candidates</h4>
                            <div class="listBox">
                                Choose Election :
                                <select name="elect" id="candElectList" onchange='showCand()'></select>
                            </div>
                            <button class="btn btn-primary btn-sm" id="addC">Continue</button>
                        </div>
                        <br>
                        <div class="hide" id="candContent">
                            <div class="display">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>FullName</th>
                                        <th>Matric</th>
                                        <th>Faculty</th>
                                        <th>Department</th>
                                        <th>Candidate Position</th>
                                        <th colspan="2">Operations</th>
                                    </tr>
                                    </thead>
                                    <tbody id='tbody2'>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!--Change Password-->
            <div class="hideTemp" id="passChange">
                <div class="fff">
                <div class="left">
                    <div>
                    You can change your Administrator login password here.
                    Once changed, the old password will remain invalid and you would 
                    only be allowed access to your normal Administrator rights
                    when you login with this new password.
                    </div>
                </div>
                <div class="right">
                    <div>
                    <h3>Change Your Login Password</h3>
                    <form action="" method="POST">
                        <input type="hidden" id="school_id" value=
                        <?php 
                        if (isset($_GET['school'])){
                            echo($_GET['school']);
                        }else{
                            session_unset();
                        }
                        ?>>
                        <label for="oldPass">Old Password</label>
                        <input type="password" id="oldPass" required>
                        <label for="newPass">New Password</label>
                        <input type="password" id="newPass" required>
                        <label for="newPassRep">Re-enter New Password</label>
                        <input type="password" id="newPassRep" required>
                        <input type="submit" name="change" value="Change Password" id="change">
                    </form> 
                    </div>
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

    <script src="DashboardJS/AdminDash.js"></script>
    <script src="DashboardJS/AdminAPI.js"></script>
</body>
</html>