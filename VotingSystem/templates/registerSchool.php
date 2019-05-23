<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Crimson+Text|Macondo+Swash+Caps|Ubuntu|Yeon+Sung" rel="stylesheet">
    <link rel="stylesheet" href="css/registerSchool.css">
    <title>SureVote</title>
</head>
<body>
    <div class="container">
        <div class="left">
            <div class="wrapper">
                <div>
                    <h3>THE NEXT GENERATION OF VOTING</h3>
                    <p>Your Vote Counts</p>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="logo">
                LOGO
            </div>
            <div class="main">
                <div>
                <h3>Register School on SureVote</h3>
                <form action="../php/validate.php" method="POST">
                    <label for="school_name">School Name</label>
                    <input type="text" name="school_name" id="school_name" required>
                    <label for="school_email">School Email</label>
                    <input type="email" name="school_email" id="school_email" required>
                    <input type="submit" name="register" value="Register" id="RegisterBtn">
                </form>
                <p>Do you have an account? <a href="loginTemp.php">LOGIN</a></p>   
                </div>
            </div>
        </div>

        <div class="modal hide" id="modal">
            <div class="inner" id="inner">
                
            </div>
        </div>
    </div>
    92056414
    <script src="../javascript/AjaxRegister.js"></script>
</body>
</html>