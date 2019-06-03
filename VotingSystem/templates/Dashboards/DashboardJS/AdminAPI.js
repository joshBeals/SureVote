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

// Targetting the Add Election
let title = document.getElementById('title');
let descrip = document.getElementById('descrip');
let addElec = document.getElementById('addElec');
let sch_id = document.getElementById('sch_id');

// Calling functions
getNumberAnalysis();
getElectionsCreated();

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

// Function to get all the elections created
function getElectionsCreated(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/getElections.php?id='+school_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            // alert(response);
            popElections(JSON.parse(response));
            popPositions(JSON.parse(response));
            candidateElection(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send();
}

addElec.addEventListener('click', e => {

    e.preventDefault();

    let electArr = ['election='+title.value, descrip.value, sch_id.value];
    title.value = '';
    descrip.value = '';
    sch_id.value = '';

    // Creating the AJAX element to add election
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/addSchoolElection.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            // alert(response);
            AddElectionPOP(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send(electArr);

    // POPING OUT THE MODAL
    modal.style.display = 'flex';

});

RegisterBtn.addEventListener('click', e => {

    e.preventDefault();

    let arr = ['arr='+faculty_name.value, faculty_email.value, school_id.value];
    faculty_name.value = '';
    faculty_email.value = '';
    school_id.value = '';

    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
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

// Function to populate informations for the admin to see.
function populateDom(result){
    SchoolsRegistered.innerHTML = result['NumberOfSchools'];
    TotalAppUsers.innerHTML = result['NumberOfSchools'] + result['TotalFaculties'];
    facultiesRegistered.innerHTML = result['NumberOfFaculties'];
    ElectionsConducted.innerHTML = result['NumberOfElectionsCreated'];
}

// Function to populate the elections on the positions board
function popPositions(result){
    let electList = document.getElementById('electList');
    electList.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        electList.options.add(opt);
        opt.text = result[i]['election_title'];
        opt.value = result[i]['election_id'];
        electList.appendChild(opt);
    }
}

// Function to populate the elections on the candidates board
function candidateElection(result){
    let candElec = document.getElementById('candElec');
    candElec.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        candElec.options.add(opt);
        opt.text = result[i]['election_title'];
        opt.value = result[i]['election_id'];
        candElec.appendChild(opt);
        showPos();
    }
}

// Function to populate the positions on the candidates board

function showPos(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getPositions.php?id='+candElec.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            candidatePosition(JSON.parse(response));
        }
    }
    xhr.send();
}


function candidatePosition(result){
    let candpos = document.getElementById('candpos');
    candpos.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        candpos.options.add(opt);
        opt.text = result[i]['position_name'];
        opt.value = result[i]['position_id'];
        candpos.appendChild(opt);
    }
}

// Function to populate the viewElections DOM
function popElections(result){
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = (i+1);
        let td1 = document.createElement('td');
        td1.innerHTML = result[i]['election_title'];
        let td2 = document.createElement('td');
        td2.innerHTML = result[i]['election_description'];
        let td3 = document.createElement('td');
        td3.innerHTML = result[i]['created_at'];
        let td4 = document.createElement('button');
        td4.setAttribute('class', 'btn btn-success btn-sm disable');
        td4.style.margin = '5px';
        td4.innerHTML = 'start voting';
        let td5 = document.createElement('button');
        td5.setAttribute('class', 'btn btn-info btn-sm');
        td5.style.margin = '5px';
        td5.innerHTML = 'view candidates';
        let td6 = document.createElement('button');
        td6.setAttribute('class', 'btn btn-danger btn-sm');
        td6.style.margin = '5px';
        td6.innerHTML = 'delete';
        td6.addEventListener('click', () => {
            deleteElection(result[i]['election_id']);
        });


        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tbody.appendChild(tr);
    }
}

// Function to delete a position
function deleteElection(id){
    // POPING OUT THE MODAL
    inner.innerHTML = '';
    modal.style.display = 'flex';

    let ok = document.createElement('button');
    ok.style.margin = '10px';
    ok.setAttribute('class', 'btn btn-primary btn-md');
    ok.innerHTML = 'Yes';
    ok.addEventListener('click', () => {
        let arr = ['delete='+id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/deleteElections.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                delElecModal(JSON.parse(response));
                getElectionsCreated();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner.innerHTML = '';
        modal.style.display = 'flex';
    });

    let cancel = document.createElement('button');
    cancel.style.margin = '10px';
    cancel.setAttribute('class', 'btn btn-danger btn-md');
    cancel.innerHTML = 'No';
    cancel.addEventListener('click', () => {
        removeModal();
    });

    inner1.innerHTML += 'Are You Sure You Want To Delete This Election?'+'<br>';
    inner1.appendChild(ok);
    inner1.appendChild(cancel);
}

// Delete Modal PoPup
function delElecModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'The election was deleted successfully!';
        a.innerHTML = 'Continue';
        a.setAttribute('id', 'continue');
        inner.appendChild(h3);
        inner.appendChild(p);
        inner.appendChild(a);
        a.addEventListener('click', () => {
            removeModal();
        });
    }else{
        h3.innerHTML = result['message'];
        p.innerHTML = 'Something went wrong';
        a.innerHTML = 'Retry';
        a.setAttribute('id', 'retry');
        inner.appendChild(h3);
        inner.appendChild(p);
        inner.appendChild(a);
        a.addEventListener('click', () => {
            removeModal();
        });
    }
}

// Function To Preopare Registration Modal
function RegPOP(result){

    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let h5a = document.createElement('h5');
    let h5b = document.createElement('h5');
    let a = document.createElement('a');


    // POPULATING THE MODAL DOM ACCORDING TO THE MESSAGE STATUS
    if(result['status'] === '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'Your Faculty has been successfully registered on the SureVote platform. Your admin Login details are given below. You would also receive a mail to activate your account. The admin Login details can be changed after Login.';
        h5a.innerHTML = "LoginID :  "+result['adminusername'];   
        h5b.innerHTML = "Password :  "+result['adminpassword'];
        a.innerHTML = 'Login';
        a.setAttribute('id', 'continue');
        a.setAttribute('href', '');
        inner.appendChild(h3);
        inner.appendChild(p);
        inner.appendChild(h5a);
        inner.appendChild(h5b);
        inner.appendChild(a);
    }else{
        h3.innerHTML = result['message'];
        p.innerHTML = 'Something went wrong in your registration. Try again';
        h5a.innerHTML = '';   
        h5b.innerHTML = '';
        a.innerHTML = 'Retry';
        a.setAttribute('id', 'retry');
        inner.appendChild(h3);
        inner.appendChild(p);
        inner.appendChild(h5a);
        inner.appendChild(h5b);
        inner.appendChild(a);
        a.addEventListener('click', () => {
            removeModal();
        });
    }
}


// Function to pop modal after adding an election
function AddElectionPOP(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] === '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'Your Election Has Been Added Successfully';
        a.innerHTML = 'Continue';
        a.setAttribute('id', 'continue');
        a.setAttribute('href', '');
        inner.appendChild(h3);
        inner.appendChild(p);
        inner.appendChild(a);
        a.addEventListener('click', () => {
            removeModal();
        });
    }else{
        h3.innerHTML = result['message'];
        p.innerHTML = 'Something went wrong';
        a.innerHTML = 'Retry';
        a.setAttribute('id', 'retry');
        a.setAttribute('href', '');
        inner.appendChild(h3);
        inner.appendChild(p);
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
