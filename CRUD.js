


// var btns = document.querySelectorAll('.btn-info');

// for(var i=0; i<btns.length; i++){
//     btns[i].addEventListener("click",function(){
//         alert("hello");
//     });
   
// }




var nameInput = document.getElementById("bookmarkName");
var urlInput = document.getElementById("bookmarkURL");
var submitButton = document.getElementById("submitBtn");
var tableBody = document.getElementById("tableContent");

var bookMarks;

if(localStorage.getItem("bookMarks")==null){
    bookMarks=[];
}
else{
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displayBook();
}

var nameRegex = /^[A-za-z_]{1,}$/
// console.log(nameRegex.test("09kjg"));

function isNameValid(){
    if(nameRegex.test(nameInput.value)){
        return true;
    }
    else{
        // alert("please enter in site Name ex A-Z or a-z");
        return false;
    }
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/
//  console.log(urlRegex.test("www.googel.com"));
function isUrlValid(){
    if(urlRegex.test(urlInput.value)){
        return true;
    }
    else{

        // alert("please enter in Url Name ex www.google.com");
        return false;
       
    }
}

nameInput.onkeyup = function(){
    if(isUrlValid() && isNameValid() ){
        submitBtn.removeAttribute("disabled");
    }
    else{
        submitBtn.disabled = "true";
    }
}

urlInput.onkeyup = function(){
    if(isUrlValid() && isNameValid() ){
        submitBtn.removeAttribute("disabled");
    }
    else{
        submitBtn.disabled = "true";
    }
}

submitButton.onclick = function(){
    var bookMark = {
        name : nameInput.value ,
        url : urlInput.value ,
    }
    bookMarks.push(bookMark);
    console.log(bookMarks);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    displayBook();
    clearData();
}


function displayBook(){
    var marks = " ";
    for(var i = 0; i<bookMarks.length; i++){
        marks+=`
        <tr>
        <td>${i}</td>

        <td>${bookMarks[i].name}</td>

        <td><a href=${"bookMarks[i].urlInput"}><button class="btn btn-success pe-2" data-index="0">
        <i class="fa-regular fa-eye"></i>  visit
     </button></a></td>

      <td><button onclick="deleteBook(${i})" class="btn btn-danger pe-2" data-index="1">
      <i class="fa-solid fa-trash-can"></i>  delete
     </button></td>
       </tr>
        `
    }
    tableBody.innerHTML=marks;
}


function deleteBook(index){
    bookMarks.splice(index,1);
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    displayBook();

}

function clearData(){
    nameInput.value="";
    urlInput.value="";

}
