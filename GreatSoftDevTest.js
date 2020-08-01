// create variables
const tableNames = [
  "First Name",
  "Last Name",
  "Gender",
  "Category",
  "Salary",
  "Delete",
];

// select elements from DOM
const allStaff = document.getElementById("allStaff");

// empty values for new member
let staffIDValue = "";
let firstNameValue = "";
let lastNameValue = "";
let genderValue = "";
let categoryValue = "";
let salaryValue = "";

// new member empty object
let newMember = {};

// totals per category empty array
let categoryTotal = [];

// separate numbers with comma for thousands
function commaSeparator(num) {
  let numPart = num.toString().split(".");
  numPart[0] = numPart[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numPart.join(".");
}

// create table heading
function tableHeading() {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", "column-name");

  tableNames.forEach((name) => {
    tableRow.innerHTML += `
        <th>${name}</th>
      `;
  });
  return tableRow;
}

// create table heading for particular members
function tableHeadingSearch() {
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("id", "column-name");

  for (let i = 0; i < tableNames.length - 1; i++) {
    tableRow.innerHTML += `
       <th>${tableNames[i]}</th>
    `;
  }
  return tableRow;
}

// getting all staff from JSON file
async function getStaff() {
  let response = await fetch("Staff.json");
  let staffMembers = await response.json();

  let members = staffMembers.staff;

  // click event listener to see all staff members
  allStaff.addEventListener("click", function () {
    countMembers.style.display = "none";
    summedSalaries.style.display = "none";
    addForm.style.display = "none";
    tableAllStaff.innerHTML = "";
    tableHead.innerHTML = "";
    tableHead.appendChild(tableHeading());
    tableAllStaff.appendChild(tableHead);

    document.querySelector(".display-tables").style.display = "block";

    // display all members in the list
    function displayMembers(member) {
      message.style.display = "none";
      const tableRow = document.createElement("tr");
      tableRow.setAttribute("class", "column-member");
      let result = "";
      member.forEach((item) => {
        result += `
        <tr class="column-member">
          <td>${item.FirstName}</td>
          <td>${item.LastName}</td>
          <td>${gender[item.GenderID - 1]}</td>
          <td>${category[item.CategoryID - 1]}</td>
          <td>${commaSeparator(item.Salary)}</td>
          <td><button class="delete-btn${item.StaffID}">delete</button></td>
        </tr>  
          `;
      });
      tableBody.innerHTML = result;
      return tableBody;
    }
    tableAllStaff.appendChild(displayMembers(members));

    // deleting staf member part
    let removeItem;
    for (let i = 0; i < members.length; i++) {
      document.querySelector(
        `.delete-btn${members[i].StaffID}`
      ).onclick = () => {
        let id = members[i].StaffID;
        removeItem = members.filter((item) => {
          return item.StaffID !== id;
        });
        members = removeItem;
        tableAllStaff.appendChild(displayMembers(members));
        deletedMessage();
      };
    }
  });

  // click event listener to search by first name
  submitSelection.addEventListener("click", function () {
    summedSalaries.style.display = "none";
    countMembers.style.display = "none";
    addForm.style.display = "none";
    document.querySelector(".display-tables").style.display = "block";
    tableHead.appendChild(tableHeadingSearch());
    let name = document.getElementById("enterName");
    let result = "";
    for (let i = 0; i < members.length; i++) {
      if (members[i].FirstName.toLowerCase() === name.value.toLowerCase()) {
        result += `<tr class="column-member">
        <td>${members[i].FirstName}</td>
        <td>${members[i].LastName}</td>
        <td>${gender[members[i].GenderID - 1]}</td>
        <td>${category[members[i].CategoryID - 1]}</td>
        <td>${commaSeparator(members[i].Salary)}</td>
      </tr>`;
      } else {
        message.innerHTML = "Your search did not match any results!";
      }
      tableAllStaff.appendChild(tableHead);
      tableBody.innerHTML = result;
      tableAllStaff.appendChild(tableBody);
    }
    name.value = "";
  });

  // click event listener for insert new staff member
  newValuesBtn.addEventListener("click", function () {
    // get first name
    firstNameValue = insertFirstName.value;
    if (firstNameValue == "") {
      alert("First Name cannot be empty!");
      addForm.style.display = "flex";
    }

    // get last name
    lastNameValue = insertLastName.value;
    if (lastNameValue == "") {
      alert("Last Name cannot be empty!");
      addForm.style.display = "flex";
    }

    // get gender value
    if (document.getElementById("enterMale").checked) {
      genderValue = 1;
    } else if (document.getElementById("enterFemale").checked) {
      genderValue = 2;
    }
    if (genderValue == "") {
      alert("Gender must have male or female select!");
      addForm.style.display = "flex";
    }

    // get category value
    let categoryName =
      insertCategory.options[insertCategory.selectedIndex].value;
    if (categoryName === "motorsport") {
      categoryValue = 1;
    } else if (categoryName === "sport") {
      categoryValue = 2;
    } else if (categoryName === "singer") {
      categoryValue = 3;
    } else if (categoryName === "moviestar") {
      categoryValue = 4;
    }
    if (categoryValue == "") {
      alert("Category cannot be nothing!");
      addForm.style.display = "flex";
    }

    //get salary value
    salaryValue = insertSalary.value;
    if (salaryValue == "") {
      alert("Salary cannot be empty!");
      addForm.style.display = "flex";
    }

    if (
      firstNameValue != "" &&
      lastNameValue != "" &&
      genderValue != "" &&
      categoryValue != "" &&
      salaryValue != ""
    ) {
      addForm.style.display = "none";

      // new member object assign
      newMember = {
        StaffID: Math.floor(Math.random() * 1000),
        FirstName: firstNameValue,
        LastName: lastNameValue,
        GenderID: genderValue,
        CategoryID: categoryValue,
        Salary: salaryValue,
      };

      // add new member to staff array
      members.push(newMember);
    }
  });

  // click event listener to display category count table
  categoryButton.addEventListener("click", function () {
    addForm.style.display = "none";
    document.querySelector(".display-tables").style.display = "none";
    message.style.display = "none";
    summedSalaries.style.display = "none";
    countMembers.style.display = "block";
    const motorSportCategory = members.filter(
      (member) => member.CategoryID === 1
    );
    let motorSportCount = motorSportCategory.length;

    const sportCategory = members.filter((member) => member.CategoryID === 2);
    let sportCount = sportCategory.length;

    const singerCategory = members.filter((member) => member.CategoryID === 3);
    let singerCount = singerCategory.length;

    const movieStarCategory = members.filter(
      (member) => member.CategoryID === 4
    );
    let movieStarCount = movieStarCategory.length;

    categoryTotal = [
      { category: "MotorSport", count: motorSportCount },
      { category: "Sport", count: sportCount },
      { category: "Singer", count: singerCount },
      { category: "Movie Star", count: movieStarCount },
    ];
    categoryTotal.sort((a, b) => b.count - a.count);
    console.log(categoryTotal);
    let total;
    total = `
      <p>
        ${categoryTotal[0].category}
        <span>${categoryTotal[0].count}</span>
      </p>
      <p>
        ${categoryTotal[1].category}
        <span>${categoryTotal[1].count}</span>
      </p>
      <p>
        ${categoryTotal[2].category}
        <span>${categoryTotal[2].count}</span>
      </p>
      <p>
        ${categoryTotal[3].category}
        <span>${categoryTotal[3].count}</span>
      </p>
  `;
    document.querySelector(".result").innerHTML = total;
  });

  // click event listener to display gender salaries count table
  salaryButton.addEventListener("click", function () {
    countMembers.style.display = "none";
    addForm.style.display = "none";
    document.querySelector(".display-tables").style.display = "none";
    message.style.display = "none";
    summedSalaries.style.display = "block";
    const maleMembersSalaries = members
      .filter((member) => member.GenderID == 1)
      .reduce(function (total, gender) {
        return total + +gender.Salary;
      }, 0);

    const femaleMembersSalaries = members
      .filter((member) => member.GenderID == 2)
      .reduce(function (total, gender) {
        return total + +gender.Salary;
      }, 0);

    summMale.innerHTML = commaSeparator(maleMembersSalaries);
    summFemale.innerHTML = commaSeparator(femaleMembersSalaries);
  });
}

getStaff();
