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
let addVoter = document.getElementById('addVoter');
let changepassword = document.getElementById('changepassword');
let settings = document.getElementById('signout');
let signout = document.getElementById('signout');

// Templates
let content = document.getElementById('content');
let f_reg = document.getElementById('f_reg');
let AddElection = document.getElementById('AddElection');


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
});

registerFaculty.addEventListener('click', () => {
    f_reg.className = 'showTemp';
    content.className = 'hideTemp';
    AddElection.className = 'hideTemp';
});

addElection.addEventListener('click', () => {
    AddElection.className = 'showTemp';
    content.className = 'hideTemp';
    f_reg.className = 'hideTemp';
});