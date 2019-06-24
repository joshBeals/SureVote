// Declarations

let schl_id = document.getElementById('school_id');

let sidebar = document.getElementById('sidebar');
let menuToogle = document.getElementById('menuToogle');
let vote = document.getElementById('vote');
let reg = document.getElementById('reg');
let cand = document.getElementById('cand');
let voteclick = document.getElementById('voteclick');
let regclick = document.getElementById('regclick');
let candclick = document.getElementById('candclick');
let voteul = document.getElementById('voteul');
let regul = document.getElementById('regul');
let candul = document.getElementById('candul');
let votedrop = document.getElementById('votedrop');
let regdrop = document.getElementById('regdrop');
let canddrop = document.getElementById('canddrop');

// Sidebar Targets
let dashboard = document.getElementById('dashboard');
let viewVoters = document.getElementById('viewVoters');
let addElection = document.getElementById('addElection');
let votingList = document.getElementById('votingList');
let ResultBlock = document.getElementById('addVoResultBlockter');
let addPositions = document.getElementById('addPositions');
let addCandidates = document.getElementById('addCandidates');
let viewCandidates = document.getElementById('viewCandidates');
let changepassword = document.getElementById('changepassword');
let settings = document.getElementById('settings');
let signout = document.getElementById('signout');

// Templates
let content = document.getElementById('content');
let AddElection = document.getElementById('AddElection');
let viewElections = document.getElementById('viewElections');
let positions = document.getElementById('positions');
let candidates = document.getElementById('candidates');
let viewCand = document.getElementById('viewCand');

// Positions
let posContent = document.getElementById('posContent');
let electList = document.getElementById('electList');
let addP = document.getElementById('addP');
let posTxt = document.getElementById('posTxt');
let posBtn = document.getElementById('posBtn');
let modal1 = document.getElementById('modal');
let inner1 = document.getElementById('inner');

// Candidates
let candElectList = document.getElementById('candElectList');

// Displaying the posContent if conditions are met
addP.addEventListener('click', () => {
    if(electList.value != ''){
        posContent.className = 'show';
        addP.innerHTML = 'Refresh';
        showData();
    }
});

// Displaying the candContent if conditions are met
addC.addEventListener('click', () => {
    if(candElectList.value != ''){
        candContent.className = 'show';
        addC.innerHTML = 'Refresh';
        showCand();
    }
});

// Sending the data entered to the positions table
posBtn.addEventListener('click', () => {
    let text = ['position='+posTxt.value,electList.value];
    posTxt.value = '';
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/addDeptElectionPositions.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            popModal(JSON.parse(response));
            showData();
        }else{
            alert(this.status);
        }
    }
    xhr.send(text);

    // POPING OUT THE MODAL
    modal1.style.display = 'flex';
});

function showData(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getDeptPositions.php?id='+electList.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            popData(JSON.parse(response));
        }
    }
    xhr.send();
}

function showPos1(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getDeptPositions.php?id='+candElec.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            alert(response);
            popData(JSON.parse(response));
        }
    }
    xhr.send();
}

// show data on the modal
function popModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This position was added successfully!';
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

// Showing the data on the table
function showCand(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getDeptCandidates.php?id='+candElectList.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            popCand(JSON.parse(response));
        }
    }
    xhr.send();
}

function popData(result){
    let tbody1 = document.getElementById('tbody1');
    tbody1.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = (i+1);
        let td1 = document.createElement('td');
        td1.innerHTML = result[i]['position_name'];
        let td2 = document.createElement('td');
        td2.innerHTML = result[i]['created_at'];
        let td3 = document.createElement('button');
        td3.setAttribute('class', 'btn btn-primary btn-sm');
        td3.style.margin = '5px';
        td3.innerHTML = 'Edit';
        td3.addEventListener('click', () => {
            editPosition(result[i]['position_name'], result[i]['position_id']);
        });
        let td4 = document.createElement('button');
        td4.setAttribute('class', 'btn btn-danger btn-sm');
        td4.style.margin = '5px';
        td4.innerHTML = 'delete';
        td4.addEventListener('click', () => {
            deletePosition(result[i]['position_id']);
        });


        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody1.appendChild(tr);
    }
}

function popCand(result){
    let tbody2 = document.getElementById('tbody2');
    tbody2.innerHTML = '';
    for(let i = 0; i < result.length; i++){
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = (i+1);
        let td1 = document.createElement('td');
        td1.innerHTML = result[i]['candidate_name'];
        let td2 = document.createElement('td');
        td2.innerHTML = result[i]['candidate_matric'];
        let td3 = document.createElement('td');
        td3.innerHTML = result[i]['dept_name'];
        let td5 = document.createElement('td');
        td5.innerHTML = result[i]['position_name'];
        let td6 = document.createElement('button');
        td6.setAttribute('class', 'btn btn-primary btn-sm');
        td6.style.margin = '5px';
        td6.innerHTML = 'Edit';
        td6.addEventListener('click', () => {
            editCandidate(result[i]['candidate_name'], result[i]['candidate_matric'], result[i]['candidate_id']);
        });
        let td7 = document.createElement('button');
        td7.setAttribute('class', 'btn btn-danger btn-sm');
        td7.style.margin = '5px';
        td7.innerHTML = 'delete';
        td7.addEventListener('click', () => {
            deleteCandidate(result[i]['candidate_id']);
        });

        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tbody2.appendChild(tr);
    }
}

// Editing the positions
function editCandidate(name, matric, id){
    
    cand_id = id;
    cand_name = name;
    cand_matric = matric;

    // POPING OUT THE MODAL
    inner1.innerHTML = '';
    modal1.style.display = 'flex';

    let h3 = document.createElement('h3');
    h3.innerHTML = "EDIT CANDIDATE's INFORMATION";
    h3.style.textAlign = 'center';
    h3.style.marginBottom = '20px';

    let labname = document.createElement('p');
    labname.innerHTML = 'Candidate Name';
    labname.style.color = '#062A4A';
    labname.style.textAlign = 'left';
    labname.style.padding = '0'; labname.style.margin = '0';
    labname.style.fontWeight = 'bold';

    let txtname = document.createElement('input');
    txtname.value = cand_name;
    txtname.style.width = '100%';
    txtname.style.padding = '0px 5px';
    txtname.style.marginBottom = '10px';

    let labmatric = document.createElement('p');
    labmatric.innerHTML = 'Candidate Matric';
    labmatric.style.color = '#062A4A';
    labmatric.style.textAlign = 'left';
    labmatric.style.padding = '0'; labmatric.style.margin = '0';
    labmatric.style.fontWeight = 'bold';

    let txtmatric = document.createElement('input');
    txtmatric.value = cand_matric;
    txtmatric.style.width = '100%';
    txtmatric.style.padding = '0px 5px';
    txtmatric.style.marginBottom = '10px';

    let labdept = document.createElement('p');
    labdept.innerHTML = 'Candidate Department';
    labdept.style.color = '#062A4A';
    labdept.style.textAlign = 'left';
    labdept.style.padding = '0'; labdept.style.margin = '0';
    labdept.style.fontWeight = 'bold';

    let depts = document.createElement('select');
    depts.style.width = '100%';
    depts.style.padding = '5px';
    depts.style.marginBottom = '10px';
    let opts = document.createElement('option');
    depts.options.add(opts);
    if(candElectList != ''){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '../../php/api/GetData/getFacDept.php?id='+fac_id.value, true);
        xhr.onload = function(){
            if(this.status == 200){
                let response = JSON.parse(this.responseText);
                depts.innerHTML = '';
                for(let i = 0; i < response.length; i++){
                    let opt = document.createElement('option');
                    depts.options.add(opt);
                    opt.text = response[i]['dept_name'];
                    opt.value = response[i]['dept_id'];
                    depts.appendChild(opt);
                }
            }else{
                alert(this.status);
            }
        }
        xhr.send();
    }

    let labpos = document.createElement('p');
    labpos.innerHTML = 'Candidate Position';
    labpos.style.color = '#062A4A';
    labpos.style.textAlign = 'left';
    labpos.style.padding = '0'; labpos.style.margin = '0';
    labpos.style.fontWeight = 'bold';

    let pos = document.createElement('select');
    pos.style.width = '100%';
    pos.style.padding = '5px';
    pos.style.marginBottom = '20px';
    // Function to get all the positions registered
    if(candElectList.value != ''){
        // Creating the AJAX element to add positions
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/GetData/getFacPositions.php?id='+candElectList.value, true);
        xhr.onload = function(){
            if(this.status == 200){
                let response = JSON.parse(this.responseText);
                pos.innerHTML = '';
                for(let i = 0; i < response.length; i++){
                    let opt = document.createElement('option');
                    pos.options.add(opt);
                    opt.text = response[i]['position_name'];
                    opt.value = response[i]['position_id'];
                    pos.appendChild(opt);
                }
            }
        }
        xhr.send();
    }

    let btnDiv = document.createElement('div');
    btnDiv.style.display = 'flex';

    let edit = document.createElement('button');
    edit.innerHTML = 'Save';
    edit.className = 'btn btn-primary';
    edit.style.marginRight = '10px';
    edit.addEventListener('click', () => {
        let arr = ['editCand='+txtname.value, txtmatric.value, depts.value,pos.value, cand_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editFacCandidates.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                editCandModal(JSON.parse(response));
                showCand();
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
    exit.className = 'btn btn-danger';
    exit.addEventListener('click', () => {
        removeModal();
    });

    btnDiv.appendChild(edit);
    btnDiv.appendChild(exit);
    
    inner1.appendChild(h3);
    inner1.appendChild(labname);
    inner1.appendChild(txtname);
    inner1.appendChild(labmatric);
    inner1.appendChild(txtmatric);
    inner1.appendChild(labdept);
    inner1.appendChild(depts);
    inner1.appendChild(labpos);
    inner1.appendChild(pos);
    inner1.appendChild(btnDiv);

}

// Editing the positions
function editPosition(name, id){
    pos_name = name;
    pos_id = id;

    // POPING OUT THE MODAL
    inner1.innerHTML = '';
    modal1.style.display = 'flex';

    let topic = document.createElement('h3');
    topic.innerHTML = 'Edit Position';
    topic.style.marginBottom = '20px';
    
    let txtbox = document.createElement('input');
    txtbox.setAttribute('type', 'text');
    txtbox.style.padding = '4px';
    txtbox.value = pos_name;

    let btn = document.createElement('button'); 
    btn. className = 'btn btn-primary btn-md';
    btn.style.margin = '5px';
    btn.innerHTML = 'Save';
    btn.addEventListener('click', () => {
        let arr = ['edit='+txtbox.value, pos_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editDeptPositions.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                editPosModal(JSON.parse(response));
                showData();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner1.innerHTML = '';
        modal1.style.display = 'flex';
    });

    inner1.appendChild(topic);
    inner1.appendChild(txtbox);
    inner1.appendChild(btn);
}

// Function to delete a position
function deleteCandidate(id){
    // POPING OUT THE MODAL
    inner1.innerHTML = '';
    modal1.style.display = 'flex';

    let ok = document.createElement('button');
    ok.style.margin = '10px';
    ok.setAttribute('class', 'btn btn-primary btn-md');
    ok.innerHTML = 'Yes';
    ok.addEventListener('click', () => {
        let arr = ['delete='+id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/deleteDeptCandidates.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                delCandModal(JSON.parse(response));
                showCand();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner1.innerHTML = '';
        modal1.style.display = 'flex';
    });

    let cancel = document.createElement('button');
    cancel.style.margin = '10px';
    cancel.setAttribute('class', 'btn btn-danger btn-md');
    cancel.innerHTML = 'No';
    cancel.addEventListener('click', () => {
        removeModal();
    });

    inner1.innerHTML += 'Are You Sure You Want To Delete This Candidate?'+'<br>';
    inner1.appendChild(ok);
    inner1.appendChild(cancel);    
}

// Function to delete a position
function deletePosition(id){
    // POPING OUT THE MODAL
    inner1.innerHTML = '';
    modal1.style.display = 'flex';

    let ok = document.createElement('button');
    ok.style.margin = '10px';
    ok.setAttribute('class', 'btn btn-primary btn-md');
    ok.innerHTML = 'Yes';
    ok.addEventListener('click', () => {
        let arr = ['delete='+id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/deleteDeptPositions.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function(){
            if(this.status == 200){
                let response = this.responseText;
                delPosModal(JSON.parse(response));
                showData();
            }else{
                alert(this.status);
            }
        }
        xhr.send(arr);
        // POPING OUT THE MODAL
        inner1.innerHTML = '';
        modal1.style.display = 'flex';
    });

    let cancel = document.createElement('button');
    cancel.style.margin = '10px';
    cancel.setAttribute('class', 'btn btn-danger btn-md');
    cancel.innerHTML = 'No';
    cancel.addEventListener('click', () => {
        removeModal();
    });

    inner1.innerHTML += 'Are You Sure You Want To Delete This Position?'+'<br>';
    inner1.appendChild(ok);
    inner1.appendChild(cancel);
}

// Edit Modal Pop up
function editCandModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This candidate was updated successfully!';
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

// Edit Modal Pop up
function editPosModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This position was edited successfully!';
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
function delCandModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This Candidate was deleted successfully!';
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
function delPosModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'This position was deleted successfully!';
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

// REMOVING THE POPUP MODAL
function removeModal(){
    modal1.style.display = 'none';
    inner1.innerHTML = '';
}


// Event Listeners for menu dropdowns
voteclick.addEventListener('click', () => {
    if(votedrop.className == 'hidedrop'){
        votedrop.className = 'showdrop';
    }else{
        votedrop.className = 'hidedrop'
    }
    voteul.classList.toggle('show');
    vote.classList.toggle('showbackground');
});

candclick.addEventListener('click', () => {
    if(canddrop.className == 'hidedrop'){
        canddrop.className = 'showdrop';
    }else{
        canddrop.className = 'hidedrop'
    }
    candul.classList.toggle('show');
    cand.classList.toggle('showbackground');
});

// Event Listener for sidebar toogle
menuToogle.addEventListener('click', () => {
    if(sidebar.classList.contains('show')){
        sidebar.classList.add('hide');
        sidebar.classList.remove('show');
    }else{
        sidebar.classList.remove('hide');
        sidebar.classList.add('show');
    }
    
});

// Event Listener for Templating
dashboard.addEventListener('click', () => {
    content.className = 'showTemp';
    AddElection.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

addElection.addEventListener('click', () => {
    AddElection.className = 'showTemp';
    content.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

votingList.addEventListener('click', () => {
    viewElections.className = 'showTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

addPositions.addEventListener('click', () => {
    positions.className = 'showTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

addCandidates.addEventListener('click', () => {
    candidates.className = 'showTemp';
    positions.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

viewCandidates.addEventListener('click', () => {
    viewCand.className = 'showTemp';
    candidates.className = 'hideTemp';
    positions.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
});