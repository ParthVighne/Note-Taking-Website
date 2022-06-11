console.log("JavaScript Working Fine.");
showNotes();

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  if (addTxt.value === "") {
    alert("Unable to add note. Write something in it first");
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
  }
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `<div class="card mx-2 my-3 " style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1} </h5>
                <p class="card-text">${element}</p>
                <a href="#" id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</a>
            </div>
        </div>`;
  });
  let notesElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElement.innerHTML = html;
  } else {
    // notesElement.innerHTML = `<h5 class="mx-5 my-3">Nothing to show ! Add a Note.</h5>`;
    notesElement.innerHTML = `<div class="container h5 text-centre my-3 mx-3 ">Nothing to show ! Add a Note.</div>`;
  }
}

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  let card = document.getElementsByClassName("card");
  Array.from(card).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

let delBtn = document.getElementById("delBtn");
delBtn.addEventListener("click", function () {
  console.log("Delete button pressed.");
  localStorage.clear();
  showNotes();
});
