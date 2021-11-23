let subnow = 0;
let peopleNow = null;

function _getQuery(url, response)
{
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
            response(JSON.parse(request.responseText));
        }
    });
    
    request.send();
}


function loadSub(response){
    let text = "";
    response.forEach(element => {
        text += `<li><a href='javascript: showSub(${element.id})'>${element.name}</a> <a href='javascript: tryDeleteSub(${element.id})'>(удалить)</a></li>\n`;
    });
    text += "<li><a href='javascript: showSub(0)'>Показать все</a>";
    let element = document.querySelector('.sub .list');
    element.innerHTML = text;
}

function tryDeleteSub(id){
    if(confirm("Удалить?")){
        _getQuery(`back.php?do=delsub&id=${id}`, (result) => {
            if(result.status == "ok"){
                _getQuery('back.php?do=sub', loadSub);
                return;
            }
            alert("Ошибка удаления!");
        });
    }
}

function showSub(id){
    subnow = id;
    document.getElementById("surname").value = "";
    document.getElementById("name").value = "";
    document.getElementById("secondname").value = "";
    document.getElementById("bdate").value = "";
    document.getElementById("pol").value = "";
    document.getElementById("newid").value = "";
    if(id != 0){
        document.querySelector(".newworker").style.display = "inline-table";
    }else{
        document.querySelector(".newworker").style.display = "none";
    }
    _getQuery(`back.php?do=show&sub=${id}`, (result) => {
        peopleNow = result;
        let table = "<table border='1'>";
        result.forEach(element => {
            let namePol = "";
            if(element.pol == "1"){
                namePol = "Мужской";
            }else{
                namePol = "Женский";
            }
            table += `<tr>
                <td><a href='javascript: changeworker(${element.id});'>${element.surname} ${element.name} ${element.name}</a></td>
                <td>${element.bdate}</td><td>${namePol}</td>
                <td><a href='javascript: tryDeleteWorker(${element.id});'>Удалить</td>
                </tr>`;
        });
        table += "</table>";
        document.querySelector(".people").innerHTML = table;
    });
}

function changeworker(id){
    var num = 0;
    console.log(id);
    peopleNow.forEach((value, key) => {
        if(value.id == id){
            num = key;
        }
    });
    console.log(num);
    document.getElementById("surname").value = peopleNow[num].surname;
    document.getElementById("name").value = peopleNow[num].name;
    document.getElementById("secondname").value = peopleNow[num].secondname;
    document.getElementById("bdate").value = peopleNow[num].bdate;
    document.getElementById("pol").value = peopleNow[num].pol;
    document.getElementById("newid").value = peopleNow[num].id;
}

function tryDeleteWorker(id){
    if(confirm("Удалить работника?")){
        _getQuery(`back.php?do=delworker&id=${id}`, (result) => {
            if(result.status == "ok"){
                showSub(subnow);
                return;
            }
            alert("Ошибка удаления!");
        });
    }
}
function addNewSub(){
    let newNameSub = document.getElementById('newSubInput').value;
    _getQuery(`back.php?do=newsub&name=${newNameSub}`, (result) => {
        if(result.status == "ok"){
            _getQuery('back.php?do=sub', loadSub);
            document.getElementById('newSubInput').value = "";
            return;
    }
    alert("Ошибка добавления подразделения!");}
    );
}

function saveornew(){
    let surname = document.getElementById("surname").value;
    let name = document.getElementById("name").value;
    let secondname = document.getElementById("secondname").value;
    let bdate = document.getElementById("bdate").value;
    let pol = document.getElementById("pol").value;
    let id = document.getElementById("newid").value;
    _getQuery(`back.php?do=newWorker&sub=${subnow}&surname=${surname}&name=${name}&secondname=${secondname}&bdate=${bdate}&pol=${pol}&id=${id}`, (result) => {
        showSub(subnow);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    _getQuery('back.php?do=sub', loadSub);
});