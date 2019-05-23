// DECLARING THE MAIN ELEMENTS
let modal = document.getElementById('modal');
let RegisterBtn = document.getElementById('RegisterBtn');
let school_name = document.getElementById('school_name');
let school_email = document.getElementById('school_email');
let inner = document.getElementById('inner');

// Function To Handle School Registration
RegisterBtn.addEventListener('click', e => {

    // REMOVING THE DEFAUL ACTION OF SUBMIT
    e.preventDefault();

    let array = ["values=" + school_name.value, school_email.value];
    school_name.value = '';
    school_email.value = '';

    // CREATING THE AJAX OBJECT
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../php/validateReg.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            console.log(response);
            RegPOP(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send(array);

    // POPING OUT THE MODAL
    modal.classList.remove('hide');
    modal.classList.add('show');

});



// Function To Preopare Registration Modal
function RegPOP(result){

    // ELEMENTS TO POPULATE THE MODAL
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    let h3a = document.createElement('h3');
    let h3b = document.createElement('h3');
    let a = document.createElement('a');


    // POPULATING THE MODAL DOM ACCORDING TO THE MESSAGE STATUS
    if(result['status'] === '1'){
        h1.innerHTML = result['message'];
        p.innerHTML = 'Your School has been successfully registered on the SureVote platform. Your admin Login details are given below. You would also receive a mail to activate your account. The admin Login details can be changed after Login.';
        h3a.innerHTML = "LoginID :  "+result['adminusername'];   
        h3b.innerHTML = "Password :  "+result['adminpassword'];
        a.innerHTML = 'Login';
        a.setAttribute('id', 'continue');
        a.setAttribute('href', 'loginTemp.php');
        inner.appendChild(h1);
        inner.innerHTML += '<br>';
        inner.appendChild(p);
        inner.appendChild(h3a);
        inner.appendChild(h3b);
        inner.innerHTML += '<br>';
        inner.appendChild(a);
    }else{
        h1.innerHTML = result['message'];
        p.innerHTML = 'Something went wrong in your registration. Try again';
        h3a.innerHTML = '';   
        h3b.innerHTML = '';
        a.innerHTML = 'Retry';
        a.setAttribute('id', 'retry');
        a.setAttribute('href', 'registerSchool.php');
        inner.appendChild(h1);
        inner.innerHTML += '<br>';
        inner.appendChild(p);
        inner.appendChild(h3a);
        inner.appendChild(h3b);
        inner.innerHTML += '<br>';
        inner.appendChild(a);
    }
}


// REMOVING THE POPUP MODAL
function removeModal(){
    modal.classList.remove('show');
    modal.classList.add('hide');
    inner.innerHTML = '';
}