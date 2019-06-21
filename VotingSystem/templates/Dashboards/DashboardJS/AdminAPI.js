// chs 59251522
// cit 02089524
// sse 67407149
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
let RegisterBtn1 = document.getElementById('RegisterBtn1');
let modal = document.getElementById('modal');
let inner = document.getElementById('inner');

// Targetting the Add Election
let title = document.getElementById('title');
let descrip = document.getElementById('descrip');
let addElec = document.getElementById('addElec');
let sch_id = document.getElementById('sch_id');

// Targetting the Add Candidates
let candFac = document.getElementById('candFac');
let candDept = document.getElementById('candDept');
let candElec = document.getElementById('candElec');
let candpos = document.getElementById('candpos');
let candName = document.getElementById('candName');
let manifesto = document.getElementById('manifesto');
let addCand = document.getElementById('addCand');


// Calling functions
getNumberAnalysis();
getElectionsCreated();
getFacultiesCreated();
getDeptsCreated();

// Function to get NumberAnalysis
function getNumberAnalysis(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/numberAnalysis.php?id='+school_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            
            populateDom(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send();
}

// Function to get all the faculties registered
function getFacultiesCreated(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/getFaculties.php?id='+school_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            
            regdep(JSON.parse(response));
            candidateFaculties(JSON.parse(response));
            viewFaculties(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send();
}

// Function to get all the faculties registered
function getDeptsCreated(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/getDept.php?id='+school_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            
            viewDepts(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send();
}

// faculty to show all faculties under the school
function regdep(result){
    let fac = document.getElementById('fac');
    fac.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        fac.options.add(opt);
        opt.text = result[i]['faculty_name'];
        opt.value = result[i]['faculty_id'];
        fac.appendChild(opt);
    }
}

// Function to view departments
function viewDepts(result){
    let tbodyD = document.getElementById('tbodyD');
    tbodyD.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = (i+1);
        let td1 = document.createElement('td');
        td1.innerHTML = result[i]['dept_name'];
        let td2 = document.createElement('td');
        td2.innerHTML = result[i]['dept_email'];
        let td2a = document.createElement('td');
        td2a.innerHTML = result[i]['faculty_name'];
        let td3 = document.createElement('td');
        td3.innerHTML = result[i]['created_at'];
        let td4 = document.createElement('button');
        td4.setAttribute('class', 'btn btn-info btn-sm');
        td4.style.margin = '5px';
        td4.innerHTML = 'Edit';
        td4.addEventListener('click', () => {
            editDept(result[i]['dept_id'], result[i]['dept_name'], result[i]['dept_email']);
        });
        let td5 = document.createElement('button');
        td5.setAttribute('class', 'btn btn-danger btn-sm');
        td5.style.margin = '5px';
        td5.innerHTML = 'delete';
        td5.addEventListener('click', () => {
            deleteDept(result[i]['dept_id']);
        });


        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td2a);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbodyD.appendChild(tr);
    }
}

// Function to view faculties
function viewFaculties(result){
    let tbodyF = document.getElementById('tbodyF');
    tbodyF.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = (i+1);
        let td1 = document.createElement('td');
        td1.innerHTML = result[i]['faculty_name'];
        let td2 = document.createElement('td');
        td2.innerHTML = result[i]['faculty_email'];
        let td3 = document.createElement('td');
        td3.innerHTML = result[i]['created_at'];
        let td4 = document.createElement('button');
        td4.setAttribute('class', 'btn btn-info btn-sm');
        td4.style.margin = '5px';
        td4.innerHTML = 'Edit';
        td4.addEventListener('click', () => {
            editFaculty(result[i]['faculty_id'], result[i]['faculty_name'], result[i]['faculty_email']);
        });
        let td5 = document.createElement('button');
        td5.setAttribute('class', 'btn btn-danger btn-sm');
        td5.style.margin = '5px';
        td5.innerHTML = 'delete';
        td5.addEventListener('click', () => {
            deleteFaculty(result[i]['faculty_id']);
        });


        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbodyF.appendChild(tr);
    }
}

// Function to get all the elections created
function getElectionsCreated(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/getElections.php?id='+school_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            // 
            popElections(JSON.parse(response));
            popPositions(JSON.parse(response));
            candidateElection(JSON.parse(response));
            viewCandElect(JSON.parse(response));
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
            // 
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
    alert(arr);
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
            
            RegPOP(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send(arr);

    // POPING OUT THE MODAL
    modal.style.display = 'flex';
});

RegisterBtn1.addEventListener('click', e => {

    e.preventDefault();

    let arr = ['arr='+dept_name.value, dept_email.value, fac.value];
    dept_name.value = '';
    dept_email.value = '';

    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/registerDept.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            
            deptRegPOP(JSON.parse(response));
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
    TotalAppUsers.innerHTML = result['NumberOfSchools'] + result['TotalFaculties']+result['TotalDept'];
    facultiesRegistered.innerHTML = result['NumberOfFaculties'];
    ElectionsConducted.innerHTML = result['NumberOfElectionsCreated'];
    departmentsRegistered.innerHTML = result['departments'];
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

// Function to populate the faculties on the candidates board
function candidateFaculties(result){
    candFac.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        candFac.options.add(opt);
        opt.text = result[i]['faculty_name'];
        opt.value = result[i]['faculty_id'];
        candFac.appendChild(opt);
        showDept();
    }
}

function showDept(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getFacDept.php?id='+candFac.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            candidateDepts(JSON.parse(response));
        }
    }
    xhr.send();
}

// Function to populate the faculties on the candidates board
function candidateDepts(result){
    candDept.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        candDept.options.add(opt);
        opt.text = result[i]['dept_name'];
        opt.value = result[i]['dept_id'];
        candDept.appendChild(opt);
    }
}

// Function to populate the elections on the candidates board
function candidateElection(result){
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

// Function to populate the elections on the viewCandidates board
function viewCandElect(result){
    let candElectList = document.getElementById('candElectList');
    candElectList.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        candElectList.options.add(opt);
        opt.text = result[i]['election_title'];
        opt.value = result[i]['election_id'];
        candElectList.appendChild(opt);
        // showCand();
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
    candpos.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let opt = document.createElement('option');
        candpos.options.add(opt);
        opt.text = result[i]['position_name'];
        opt.value = result[i]['position_id'];
        candpos.appendChild(opt);
    }
}

// Ajax to addCandidates
addCand.addEventListener('click', () => {
    let arr = ['info='+candName.value,candMatric.value,candFac.value,candDept.value,candElec.value,candpos.value];
    candName.value = '';
    candMatric.value = '';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/addCandidates.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            candDom(JSON.parse(response));
        }
    }
    xhr.send(arr);

    // POPING OUT THE MODAL
    modal.style.display = 'flex';
    inner.innerHTML = '';
});

// CANDIDATE DOM
function candDom(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This candidate was added successfully!';
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
        td5.innerHTML = 'Edit';
        td5.addEventListener('click', () => {
            editElection(result[i]['election_id'], result[i]['election_title'], result[i]['election_description']);
        });
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

// Function to edit a faculty
function editDept(id, name, email){
    dept_id = id;
    dept_name = name;
    dept_email = email;

    // POPING OUT THE MODAL
    inner.innerHTML = '';
    modal.style.display = 'flex';

    // Creating the DOM elements
    let topic = document.createElement('h3');
    topic.innerHTML = 'Edit Department';
    topic.style.marginBottom = '20px';

    let lab1 = document.createElement('p');
    lab1.innerHTML = 'Department Name';
    lab1.style.padding = '0';
    lab1.style.marginBottom = '3px';
    lab1.style.textAlign = 'left';
    lab1.style.fontWeight = 'bold';

    let lab2 = document.createElement('p');
    lab2.innerHTML = 'Department Email';
    lab2.style.padding = '0';
    lab2.style.marginBottom = '3px';
    lab2.style.textAlign = 'left';
    lab2.style.fontWeight = 'bold';

    let txt1 = document.createElement('input');
    txt1.setAttribute('type', 'text');
    txt1.style.padding = '3px';
    txt1.style.width = '100%';
    txt1.style.marginBottom = '10px';
    txt1.value = dept_name;

    let txt2 = document.createElement('input');
    txt2.setAttribute('type', 'text');
    txt2.style.padding = '3px';
    txt2.style.width = '100%';
    txt2.style.marginBottom = '10px';
    txt2.value = dept_email;

    let btnDiv = document.createElement('div');
    btnDiv.style.display = 'flex';

    let btn = document.createElement('button');
    btn. className = 'btn btn-primary btn-sm';
    btn.style.marginRight = '10px';
    btn.innerHTML = 'Save';
    btn.addEventListener('click', () => {
        let arr = ['editDept='+txt1.value, txt2.value, dept_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editDepartment.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                
                editDeptModal(JSON.parse(response));
                getDeptsCreated();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner1.innerHTML = '';
        modal1.style.display = 'flex';
    });

    let exit = document.createElement('button');
    exit.innerHTML = 'Cancel';
    exit.className = 'btn btn-danger btn-sm';
    exit.addEventListener('click', () => {
        removeModal();
    });

    btnDiv.appendChild(btn);
    btnDiv.appendChild(exit);

    inner.appendChild(topic);
    inner.appendChild(lab1);
    inner.appendChild(txt1);
    inner.appendChild(lab2);
    inner.appendChild(txt2);
    inner.appendChild(btnDiv);
}

// Function to edit a faculty
function editFaculty(id, name, email){
    fac_id = id;
    fac_name = name;
    fac_email = email;

    // POPING OUT THE MODAL
    inner.innerHTML = '';
    modal.style.display = 'flex';

    // Creating the DOM elements
    let topic = document.createElement('h3');
    topic.innerHTML = 'Edit Faculty';
    topic.style.marginBottom = '20px';

    let lab1 = document.createElement('p');
    lab1.innerHTML = 'Faculty Name';
    lab1.style.padding = '0';
    lab1.style.marginBottom = '3px';
    lab1.style.textAlign = 'left';
    lab1.style.fontWeight = 'bold';

    let lab2 = document.createElement('p');
    lab2.innerHTML = 'Faculty Email';
    lab2.style.padding = '0';
    lab2.style.marginBottom = '3px';
    lab2.style.textAlign = 'left';
    lab2.style.fontWeight = 'bold';

    let txt1 = document.createElement('input');
    txt1.setAttribute('type', 'text');
    txt1.style.padding = '3px';
    txt1.style.width = '100%';
    txt1.style.marginBottom = '10px';
    txt1.value = fac_name;

    let txt2 = document.createElement('input');
    txt2.setAttribute('type', 'text');
    txt2.style.padding = '3px';
    txt2.style.width = '100%';
    txt2.style.marginBottom = '10px';
    txt2.value = fac_email;

    let btnDiv = document.createElement('div');
    btnDiv.style.display = 'flex';

    let btn = document.createElement('button');
    btn. className = 'btn btn-primary btn-sm';
    btn.style.marginRight = '10px';
    btn.innerHTML = 'Save';
    btn.addEventListener('click', () => {
        let arr = ['editFac='+txt1.value, txt2.value, fac_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editFaculty.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                editFacModal(JSON.parse(response));
                getFacultiesCreated();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner1.innerHTML = '';
        modal1.style.display = 'flex';
    });

    let exit = document.createElement('button');
    exit.innerHTML = 'Cancel';
    exit.className = 'btn btn-danger btn-sm';
    exit.addEventListener('click', () => {
        removeModal();
    });

    btnDiv.appendChild(btn);
    btnDiv.appendChild(exit);

    inner.appendChild(topic);
    inner.appendChild(lab1);
    inner.appendChild(txt1);
    inner.appendChild(lab2);
    inner.appendChild(txt2);
    inner.appendChild(btnDiv);
}

// Function to edit an election
function editElection(id, name, descrip){
    elec_id = id;
    elec_name = name;
    elec_descrip = descrip;

    // POPING OUT THE MODAL
    inner.innerHTML = '';
    modal.style.display = 'flex';

    // Creating the DOM elements
    let topic = document.createElement('h3');
    topic.innerHTML = 'Edit Election';
    topic.style.marginBottom = '20px';

    let lab1 = document.createElement('p');
    lab1.innerHTML = 'Election Name';
    lab1.style.padding = '0';
    lab1.style.marginBottom = '3px';
    lab1.style.textAlign = 'left';
    lab1.style.fontWeight = 'bold';

    let lab2 = document.createElement('p');
    lab2.innerHTML = 'Election Description';
    lab2.style.padding = '0';
    lab2.style.marginBottom = '3px';
    lab2.style.textAlign = 'left';
    lab2.style.fontWeight = 'bold';

    let txt1 = document.createElement('input');
    txt1.setAttribute('type', 'text');
    txt1.style.padding = '3px';
    txt1.style.width = '100%';
    txt1.style.marginBottom = '10px';
    txt1.value = elec_name;

    let txt2 = document.createElement('textarea');
    txt2.setAttribute('row', '3');
    txt2.style.padding = '3px';
    txt2.style.width = '100%';
    txt2.style.marginBottom = '10px';
    txt2.value = elec_descrip;

    let btn = document.createElement('button');
    btn. className = 'btn btn-primary btn-sm';
    btn.style.margin = '0';
    btn.style.width = '100%';
    btn.innerHTML = 'Save';
    btn.addEventListener('click', () => {
        let arr = ['editElec='+txt1.value, txt2.value, elec_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editElection.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                editElecModal(JSON.parse(response));
                getElectionsCreated();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner1.innerHTML = '';
        modal1.style.display = 'flex';
    });

    inner.appendChild(topic);
    inner.appendChild(lab1);
    inner.appendChild(txt1);
    inner.appendChild(lab2);
    inner.appendChild(txt2);
    inner.appendChild(btn);
}

// Function to delete a faculty
function deleteDept(id){
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
        xhr.open('POST', '../../php/api/sendData/deleteDepartment.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                delDeptModal(JSON.parse(response));
                getDeptsCreated();
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

    inner1.innerHTML += 'Are You Sure You Want To Delete This Department?'+'<br>';
    inner1.appendChild(ok);
    inner1.appendChild(cancel);
}

// Function to delete a faculty
function deleteFaculty(id){
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
        xhr.open('POST', '../../php/api/sendData/deleteFaculty.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                delFacModal(JSON.parse(response));
                getFacultiesCreated();
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

    inner1.innerHTML += 'Are You Sure You Want To Delete This Faculty?'+'<br>';
    inner1.appendChild(ok);
    inner1.appendChild(cancel);
}

// Function to delete an election
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

// Edit Modal PoPup
function editDeptModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This department was edited successfully!';
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

// Edit Modal PoPup
function editFacModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This faculty was edited successfully!';
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

// Edit Modal PoPup
function editElecModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This election was edited successfully!';
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

// Delete dept Modal PoPup
function delDeptModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This department was deleted successfully!';
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

// Delete Faculty Modal PoPup
function delFacModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This faculty was deleted successfully!';
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

// Delete Modal PoPup
function delElecModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This election was deleted successfully!';
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
function deptRegPOP(result){

    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let h5a = document.createElement('h5');
    let h5b = document.createElement('h5');
    let a = document.createElement('a');


    // POPULATING THE MODAL DOM ACCORDING TO THE MESSAGE STATUS
    if(result['status'] === '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'Your Department has been successfully registered on the SureVote platform. Your admin Login details are given below. You would also receive a mail to activate your account. The admin Login details can be changed after Login.';
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
