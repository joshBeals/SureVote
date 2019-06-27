// Targetting DOM Elements
let ElectionsCreated = document.getElementById('ElectionsCreated');
let FacultyElections = document.getElementById('FacultyElections');
let SchoolElections = document.getElementById('SchoolElections');
let RegisteredVoters = document.getElementById('RegisteredVoters');
let SchoolsRegistered = document.getElementById('SchoolsRegistered');
let TotalAppUsers = document.getElementById('TotalAppUsers');
let VotersNumbers = document.getElementById('VotersNumbers');
let ElectionsStarted = document.getElementById('ElectionsStarted');

// Targetting the Add Election
let title = document.getElementById('title');
let descrip = document.getElementById('descrip');
let addElec = document.getElementById('addElec');
let fac_id = document.getElementById('fac_id');

// Targetting the Add Candidates
let candDept = document.getElementById('candDept');
let candElec = document.getElementById('candElec');
let candpos = document.getElementById('candpos');
let candName = document.getElementById('candName');
let manifesto = document.getElementById('manifesto');
let addCand = document.getElementById('addCand');


// Calling functions
getNumberAnalysis();
getElectionsCreated();

// Function to get NumberAnalysis
function getNumberAnalysis(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/numberAnalysisDept.php?id='+dept_id.value, true);
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

// Function to get all the elections created
function getElectionsCreated(){
    // Creating the AJAX element to receive data
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../../php/api/GetData/getDeptElections.php?id='+dept_id.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
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

    let electArr = ['deptElection='+title.value, descrip.value, dept_id.value];
    title.value = '';
    descrip.value = '';
    dept_id.value = '';

    // Creating the AJAX element to add election
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/addDeptElection.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            alert(response);
            AddElectionPOP(JSON.parse(response));
        }else{
            alert(this.status);
        }
    }
    xhr.send(electArr);

    // POPING OUT THE MODAL
    modal.style.display = 'flex';

});

// Function to populate informations for the admin to see.
function populateDom(result){
    SchoolsRegistered.innerHTML = result['NumberOfSchools'];
    TotalAppUsers.innerHTML = result['NumberOfSchools'] + result['TotalFaculties'] + result['TotalDepts'];
    FacultyElections.innerHTML = result['NumberOfFacElectionsCreated'];
    ElectionsCreated.innerHTML = result['NumberOfDeptElectionsCreated'];
    SchoolElections.innerHTML = result['NumberOfElectionsCreated'];
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
    }
}

// Function to populate the positions on the candidates board

function showPos(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getDeptPositions.php?id='+candElec.value, true);
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
    let arr = ['info='+candName.value,candMatric.value,candElec.value,candpos.value];
    candName.value = '';
    candMatric.value = '';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/addDeptCandidates.php', true);
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
        let arr = ['editDeptElec='+txt1.value, txt2.value, elec_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editDeptElection.php', true);
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
        xhr.open('POST', '../../php/api/sendData/deleteFacElections.php', true);
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
