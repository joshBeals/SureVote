// Declarations
let sidebar = document.getElementById('sidebar');
let menuToogle = document.getElementById('menuToogle');
let vote = document.getElementById('vote');
let reg = document.getElementById('reg');
let voteclick = document.getElementById('voteclick');
let regclick = document.getElementById('regclick');
let voteul = document.getElementById('voteul');
let regul = document.getElementById('regul');
let votedrop = document.getElementById('votedrop');
let regdrop = document.getElementById('regdrop');

// Sidebar Targets
let dashboard = document.getElementById('dashboard');
let registerFaculty = document.getElementById('registerFaculty');
let viewVoters = document.getElementById('viewVoters');
let addElection = document.getElementById('addElection');
let votingList = document.getElementById('votingList');
let ResultBlock = document.getElementById('addVoResultBlockter');
let addPositions = document.getElementById('addPositions');
let addCandidates = document.getElementById('addCandidates');
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
            // alert(response);
            popModal(JSON.parse(response));
            showData(electList.value);
        }else{
            alert(this.status);
        }
    }
    xhr.send(text);

    // POPING OUT THE MODAL
    modal1.style.display = 'flex';
});

// show data on the modal
function popModal(result){
    // ELEMENTS TO POPULATE THE MODAL
    let h3 = document.createElement('h3');
    let p = document.createElement('p');
    let a = document.createElement('a');

    if(result['status'] == '1'){
        h3.innerHTML = result['message'];
        p.innerHTML = 'The position was added successfully!';
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
function showData(id){
    // Creating the AJAX element to add positions
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../../php/api/GetData/getPositions.php?id='+id, true);
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            // alert(response);
            popData(JSON.parse(response));
            showData(electList.value);
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
        td3.setAttribute('class', 'btn btn-primary btn-sm disable');
        td3.style.margin = '5px';
        td3.innerHTML = 'Edit';
        let td4 = document.createElement('button');
        td4.setAttribute('class', 'btn btn-danger btn-sm');
        td4.style.margin = '5px';
        td4.innerHTML = 'delete';
        td4.addEventListener('click', () => {
            let parent = td4.parentNode;
            parent.parentNode.removeChild(parent);
        });


        tr.appendChild(td);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody1.appendChild(tr);
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
});

registerFaculty.addEventListener('click', () => {
    f_reg.className = 'showTemp';
    content.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
});

addElection.addEventListener('click', () => {
    AddElection.className = 'showTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
});

votingList.addEventListener('click', () => {
    viewElections.className = 'showTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    positions.className = 'hideTemp';
    candidates.className = 'hideTemp';
});

addPositions.addEventListener('click', () => {
    positions.className = 'showTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
    candidates.className = 'hideTemp';
});

addCandidates.addEventListener('click', () => {
    candidates.className = 'showTemp';
    positions.className = 'hideTemp';
    viewElections.className = 'hideTemp';
    AddElection.className = 'hideTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
});