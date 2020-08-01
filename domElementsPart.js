// category array
const category = ["Motorsport", "Sport", "Singer", "Movie Star"];
const countCategory = ["", "Motorsport", "Sport", "Singer", "Movie Star"];
// gender array
const gender = ["Male", "Female"];

//select elements from DOM
const modalSect = document.querySelector(".modal");
const selectedParameter = document.getElementById("selectParams");
const tableAllStaff = document.querySelector(".all-staff");
const submitSelection = document.getElementById("submit-select-btn");
const tableBody = document.createElement("tbody");
const tableHead = document.createElement("thead");
const inputName = document.getElementById("enterName");
const message = document.querySelector(".display-msg");
const addForm = document.querySelector(".addFormElements");

// select form elements from DOM
const insertNewMember = document.getElementById("insertMember");
const insertFirstName = document.getElementById("enterFirst");
const insertLastName = document.getElementById("enterLast");
const insertGender = document.querySelector(".gender-sect");
const insertCategory = document.getElementById("enterCategory");
const insertSalary = document.getElementById("enterSalary");

const newValuesBtn = document.querySelector(".add-new");

// more procedures buttons from DOM
const moreProcedures = document.querySelector(".more-procedures");
const categoryButton = document.querySelector(".category-count");
const salaryButton = document.querySelector(".gender-salary");
const countMembers = document.querySelector(".count-members");
const summedSalaries = document.querySelector(".summ-salary");
const summMale = document.getElementById("summ-male");
const summFemale = document.getElementById("summ-female");

// click event for searching a staff member
inputName.addEventListener("click", () => {
  countMembers.style.display = "none";
  summedSalaries.style.display = "none";
  message.style.display = "none";
  addForm.style.display = "none";
  inputName.value = "";
  document.querySelector(".display-tables").style.display = "none";
  tableAllStaff.innerHTML = "";
  tableHead.innerHTML = "";
});

// deleted member message
function deletedMessage() {
  document.querySelector(".display-tables").style.display = "none";
  tableAllStaff.innerHTML = "";
  tableHead.innerHTML = "";
  message.style.display = "block";
  message.innerHTML = "A staff member was successfully deleted!";
}

// no match search message
function noMatchMessage() {
  document.querySelector(".display-tables").style.display = "none";
  tableAllStaff.innerHTML = "";
  tableHead.innerHTML = "";
  message.style.display = "block";
  message.innerHTML = "Your search did not match any results!";
}

// open form for adding values for new member
insertNewMember.addEventListener("click", function () {
  countMembers.style.display = "none";
  summedSalaries.style.display = "none";
  insertFirstName.value = "";
  insertLastName.value = "";
  insertFirstName.placeholder = "First Name";
  insertLastName.placeholder = "Last Name";
  document.getElementById("enterMale").checked = false;
  document.getElementById("enterMale").checked = false;
  insertCategory.value = "";
  insertSalary.value = "";
  document.querySelector(".display-tables").style.display = "none";
  message.style.display = "none";
  tableAllStaff.innerHTML = "";
  tableHead.innerHTML = "";
  addForm.style.display = "flex";
  insertFirstName.addEventListener("click", () => {
    insertFirstName.placeholder = "";
  });
  insertLastName.addEventListener("click", () => {
    insertLastName.placeholder = "";
  });
});
