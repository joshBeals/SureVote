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
        console.log('contains');
        sidebar.classList.add('hide');
        sidebar.classList.remove('show');
    }else{
        console.log('not contains');
        sidebar.classList.remove('hide');
        sidebar.classList.add('show');
    }
    
});