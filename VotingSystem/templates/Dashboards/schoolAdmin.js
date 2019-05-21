// Declarations
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