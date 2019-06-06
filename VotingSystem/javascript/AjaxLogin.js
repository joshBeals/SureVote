
// DECLARING THE MAIN ELEMENTS
let modal = document.getElementById('modal');
let inner = document.getElementById('inner');
let LoginBtn = document.getElementById('LoginBtn');
let LoginID = document.getElementById('LoginID');
let Password = document.getElementById('Password');


// Function To Handle School Login
LoginBtn.addEventListener('click', e => {

    // REMOVE DEFAULT ACION
    e.preventDefault();
    
    let array = ["logindetails=" + LoginID.value, Password.value];
    //alert(array);

    // CREATING THE AJAX OBJECT
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '../php/validateLog.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function(){
        if(this.status == 200){
            let response = this.responseText;
            LogPOP(JSON.parse(response));
            // POPING OUT THE MODAL
            modal.classList.remove('hide');
            modal.classList.add('show');
        }else{
            alert(this.status);
        }
    }
    xhr.send(array);

});

// Function To Preopare Registration Modal
function LogPOP(result){

    // ELEMENTS TO POPULATE THE MODAL
    let h1 = document.createElement('h1');
    let p = document.createElement('p');
    let a = document.createElement('a');

    19084708
    // POPULATING THE MODAL DOM ACCORDING TO THE MESSAGE STATUS
    if(result['status'] === '1'){
        inner.innerHTML = '';
        h1.innerHTML = result['message'];
        p.innerHTML = 'You can continue to your Dashboard.';
        a.innerHTML = 'Continue';
        a.setAttribute('id', 'continue');
        a.setAttribute('href', 'dashboards/schoolAdmin.php?school='+result['school']);
        inner.appendChild(h1);
        inner.appendChild(p);
        inner.appendChild(a);
    }else{
        inner.innerHTML = '';
        h1.innerHTML = result['message'];
        p.innerHTML = 'Something went wrong in your Login. Try again';
        a.innerHTML = 'Retry';
        a.setAttribute('id', 'retry');
        a.setAttribute('href', 'loginTemp.php');
        inner.appendChild(h1);
        inner.appendChild(p);
        inner.appendChild(a);
    }

}


// REMOVING THE POPUP MODAL
function removeModal(){
    modal.classList.remove('show');
    modal.classList.add('hide');
    inner.innerHTML = '';
}
