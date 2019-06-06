// Declarations
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
let registerFaculty = document.getElementById('registerFaculty');
let viewVoters = document.getElementById('viewVoters');
let addElection = document.getElementById('addElection');
let votingList = document.getElementById('votingList');
let ResultBlock = document.getElementById('addVoResultBlockter');
let addPositions = document.getElementById('addPositions');
let addCandidates = document.getElementById('addCandidates');
let viewCandidates = document.getElementById('viewCandidates');
let changepassword = document.getElementById('changepassword');
let settings = document.getElementById('signout');
let signout = document.getElementById('signout');

// Templates
let content = document.getElementById('content');
let f_reg = document.getElementById('f_reg');
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

// Displaying the posContent if conditions are met
addP.addEventListener('click', () => {
    if(electList.value == ''){
        alert('Field cannot be left empty!!!');
    }else{
        posContent.className = 'show';
        showData(electList.value);
    }
});
// Sending the data entered to the positions table
posBtn.addEventListener('click', () => {
    let text = ['position='+posTxt.value,electList.value];
    posTxt.value = '';
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/sendData/addElectionPositions.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            popModal(JSON.parse(response));
            showData();
            showPos();
        }else{
            alert(this.status);
        }
    }
    xhr.send(text);

    // POPING OUT THE MODAL
    modal1.style.display = 'flex';
});

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
function showData(){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getPositions.php?id='+electList.value, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            popData(JSON.parse(response));
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

// Editing the positions
function editPosition(name, id){
    pos_name = name;
    pos_id = id;

    // POPING OUT THE MODAL
    inner1.innerHTML = '';
    modal1.style.display = 'flex';
    
    let txtbox = document.createElement('input');
    txtbox.setAttribute('type', 'text');
    txtbox.style.padding = '3px';
    txtbox.value = pos_name;

    let btn = document.createElement('button'); 
    btn. className = 'btn btn-primary btn-sm';
    btn.style.margin = '5px';
    btn.innerHTML = 'Save';
    btn.addEventListener('click', () => {
        let arr = ['edit='+txtbox.value, pos_id];
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '../../php/api/sendData/editPositions.php', true);
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

    inner1.appendChild(txtbox);
    inner1.appendChild(btn);
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
        xhr.open('POST', '../../php/api/sendData/deletePositions.php', true);
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

regclick.addEventListener('click', () => {
    if(regdrop.className == 'hidedrop'){
        regdrop.className = 'showdrop';
    }else{
        regdrop.className = 'hidedrop'
    }
    regul.classList.toggle('show');
    reg.classList.toggle('showbackground');
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
    f_reg.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

registerFaculty.addEventListener('click', () => {
    f_reg.className = 'showTemp';
    content.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

addElection.addEventListener('click', () => {
    AddElection.className = 'showTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

votingList.addEventListener('click', () => {
    viewElections.className = 'showTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

addPositions.addEventListener('click', () => {
    positions.className = 'showTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    candidates.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

addCandidates.addEventListener('click', () => {
    candidates.className = 'showTemp';
    positions.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    viewCand.className = 'hideTemp';
});

viewCandidates.addEventListener('click', () => {
    viewCand.className = 'showTemp';
    candidates.className = 'hideTemp';
    positions.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
});