// Targetting DOM Elements
let facultiesRegistered = document.getElementById('facultiesRegistered');
let departmentsRegistered = document.getElementById('departmentsRegistered');
let ElectionsConducted = document.getElementById('ElectionsConducted');
let RegisteredVoters = document.getElementById('RegisteredVoters');
let SchoolsRegistered = document.getElementById('SchoolsRegistered');
let TotalAppUsers = document.getElementById('TotalAppUsers');
let VotersNumbers = document.getElementById('VotersNumbers');
let ElectionsStarted = document.getElementById('ElectionsStarted');

// Targetting the faculty registration 
let faculty_name = document.getElementById('faculty_name');
let faculty_email = document.getElementById('faculty_email');
let school_id = document.getElementById('school_id');
let RegisterBtn = document.getElementById('RegisterBtn');
let modal = document.getElementById('modal');
let inner = document.getElementById('inner');

getNumberAnalysis();
// Function to get NumberAnalysis
function getNumberAnalysis(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/numberAnalysis.php?id='+school_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            // alert(response);
            populateDom(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send();
}

RegisterBtn.addEventListener('click', e => {

    e.preventDefault();

    let arr = ['arr='+faculty_name.value, faculty_email.value, school_id.value];
    faculty_name.value = '';
    faculty_email.value = '';
    school_id.value = '';

    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    alert(arr);
    xhr.open('POST', '../../php/api/sendData/registerFaculty.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            // alert(response);
            RegPOP(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send(arr);

    // POPING OUT THE MODAL
    modal.style.display = 'flex';
});


function populateDom(result){
    SchoolsRegistered.innerHTML = result['NumberOfSchools'];
    TotalAppUsers.innerHTML = result['NumberOfSchools'] + result['TotalFaculties'];
    facultiesRegistered.innerHTML = result['NumberOfFaculties'];
}

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
        p.innerHTML = 'Your Faculty has been successfully registered on the SureVote platform. Your admin Login details are given below. You would also receive a mail to activate your account. The admin Login details can be changed after Login.';
        h3a.innerHTML = "LoginID :  "+result['adminusername'];   
        h3b.innerHTML = "Password :  "+result['adminpassword'];
        a.innerHTML = 'Login';
        a.setAttribute('id', 'continue');
        a.setAttribute('href', '');
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
        inner.appendChild(h1);
        inner.innerHTML += '<br>';
        inner.appendChild(p);
        inner.appendChild(h3a);
        inner.appendChild(h3b);
        inner.innerHTML += '<br>';
        inner.appendChild(a);
        a.addEventListener('click', () => {
            removeModal();
        });
    }
}


// REMOVING THE POPUP MODAL
function removeModal(){
    modal.style.display = 'none';
    inner.innerHTML = '';
}
