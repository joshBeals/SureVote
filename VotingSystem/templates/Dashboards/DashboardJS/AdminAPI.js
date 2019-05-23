// Targetting DOM Elements
let facultiesRegistered = document.getElementById('facultiesRegistered');
let departmentsRegistered = document.getElementById('departmentsRegistered');
let ElectionsConducted = document.getElementById('ElectionsConducted');
let RegisteredVoters = document.getElementById('RegisteredVoters');
let SchoolsRegistered = document.getElementById('SchoolsRegistered');
let TotalAppUsers = document.getElementById('TotalAppUsers');
let VotersNumbers = document.getElementById('VotersNumbers');
let ElectionsStarted = document.getElementById('ElectionsStarted');


// Creating the AJAX element
let xhr = new XMLHttpRequest();
xhr.open('GET', '../../php/api/GetData/numberAnalysis.php', true);
xhr.onload = function(){
    if(this.status == 200){
        let response = this.responseText;
        populateDom(JSON.parse(response));
    }else{
        alert(this.status);
    }
}
xhr.send();


function populateDom(result){
    SchoolsRegistered.innerHTML = result['NumberOfSchools'];
    TotalAppUsers.innerHTML = result['NumberOfSchools'];
}
