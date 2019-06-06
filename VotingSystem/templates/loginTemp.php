<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Crimson+Text|Alegreya+Sans+SC|Macondo+Swash+Caps|Ubuntu|Yeon+Sung" rel="stylesheet">
    <link rel="stylesheet" href="css/loginTemp.css">
    <title>SureVote</title>
</head>
<body>
    <div class="cont">
        <div class="left">
            <div class="logo">
                <h5><i class="fas fa-thumbs-up"></i> SureVote</h5>
            </div>
            <div class="main">
                <div>
                <h3>Login To SureVote</h3> 
                <form action="../php/validate.php" method="POST">
                    <label for="loginID">LoginID</label>
                    <input type="text" name="loginID" id="LoginID" required>
                    <label for="password">Password</label>
                    <input type="password" name="password" id="Password" required>
                    <div class="remember">
                        <input type="checkbox" name="" id="">Remember me
                    </div>
                    <input type="submit" name="login" value="Login" id="LoginBtn">
                </form>
                <p>Do not have an account? <a href="registerSchool.php">REGISTER</a></p>                    
                <p><i class="fas fa-lock"></i><a> Forgot Password?</a></p>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="wrapper">
                <div>
                <h3>THE NEXT GENERATION OF VOTING</h3>
                <p>Your Vote Counts</p>
                </div>
            </div>
        </div>


        <div class="modal hide" id="modal">
            <div class="inner" id="inner">
                
            </div>
        </div>
    </div>
    <script src="../javascript/AjaxLogin.js"></script>
</body>
</html>