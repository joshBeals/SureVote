
const school = document.getElementById('school');
const faculty = document.getElementById('faculty');
const dept = document.getElementById('dept');

school.addEventListener('click', () => {
    login('school');
});

faculty.addEventListener('click', () => {
    login('faculty');
});

dept.addEventListener('click', () => {
    login('department');
});

function login(role){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '', true);
}