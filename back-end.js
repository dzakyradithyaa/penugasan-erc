//JS inisialisiasi
var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  city = document.getElementById("city"),
  hobi = document.getElementById("hobi"),
  quotes = document.getElementById("quotes"),
  alasan = document.getElementById("alasan"),
  medsos = document.getElementById("medsos"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  addMembersBtn = document.querySelector(".addMembers");

// JS LOCAL STORAGE
let getData = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile"))
  : [];

//EDIT LOCAL STORAGE
let isEdit = false,
  editId;
showInfo();

//JS TOMBOL NEW USER
addMembersBtn.addEventListener("click", () => {
  (submitBtn.innerText = "Submit"), (modalTitle.innerText = "Welcome Aboard!");
  isEdit = false;
  imgInput.src = "./image/Profile Icon.webp";
  form.reset();
});

//JS SIZE IMAGE
file.onchange = function () {
  if (file.files[0].size < 1000000) {
    // 1MB = 1000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result;
      imgInput.src = imgUrl;
    };
    fileReader.readAsDataURL(file.files[0]);
  } else {
    alert("This file is too large!");
  }
};

//FUNGSI OUTPUT CARD LOCAL STORAGE
function showInfo() {
  userInfo.innerHTML = "";
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("section-card"); // Menambahkan kelas untuk tata letak grid
  userInfo.appendChild(cardContainer);

  getData.forEach((element, index) => {
    //styling card
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "100%";
    card.style.marginBottom = "60px";
    card.style.padding = "20px";
    card.style.borderRadius = "30px";

    const buttons = document.querySelectorAll(
      ".btn-popup-details, .btn-popup-edit, .btn-popup-delete"
    );
    buttons.forEach((button) => {
      //hover
      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#9c769c";
        button.style.color = "#fff";
        button.style.boxShadow = "01 2px 3px rgba(0, 0, 0, 0.53)";
      });
      //asli
      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#fff";
        button.style.color = "#000";
        button.style.boxShadow = "none";
      });
    });

    //styling img
    const img = document.createElement("img");
    img.src = element.picture;
    img.alt = "Card Image";
    img.classList.add("card_img");
    img.style.width = "25%";
    img.style.display = "block";
    img.style.margin = "0 auto";
    img.style.borderRadius = "50%";

    const cardDetails = document.createElement("div");
    cardDetails.classList.add("card_details");

    const ul = document.createElement("ul");
    ul.style.listStyle = "none"; // Menetapkan gaya daftar

    const listItems = [
      { label: "Nama", value: element.employeeName },
      { label: "Asal", value: element.employeeCity },
      { label: "Hobi", value: element.employeeHobi },
      { label: "Quotes", value: element.employeeQuotes },
      { label: "Alasan", value: element.employeeAlasan },
      { label: "Medsos", value: element.employeeMedsos },
    ];

    listItems.forEach((item) => {
      const li = document.createElement("li");
      if (item.label === "Medsos") {
        const instagramIcon = document.createElement("i");
        instagramIcon.classList.add("bi", "bi-instagram");
        instagramIcon.style.marginRight = "10px";
        li.appendChild(instagramIcon);
        const instagramLink = `https://www.instagram.com/${item.value}`;
        const medsosLink = document.createElement("a");
        medsosLink.href = instagramLink;
        medsosLink.textContent = item.value;
        medsosLink.target = "_blank";
        li.appendChild(medsosLink);
        ul.appendChild(li);
      } else {
        const liText = `${item.label}: ${item.value}`;
        li.textContent = liText;
        ul.appendChild(li);
      }
    });

    cardDetails.appendChild(ul); // Menambahkan ul ke dalam cardDetails

    const btnContainer = document.createElement("div");
    btnContainer.classList.add(
      "btn-container",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    ); // Menambahkan kelas untuk tata letak grid

    const readBtn = document.createElement("button");
    readBtn.classList.add("btn-popup-details");
    readBtn.innerHTML = "Details";
    readBtn.onclick = function () {
      readInfo(
        element.picture,
        element.employeeName,
        element.employeeCity,
        element.employeeHobi,
        element.employeeQuotes,
        element.employeeAlasan,
        element.employeeMedsos
      );
    };
    readBtn.setAttribute("data-bs-toggle", "modal");
    readBtn.setAttribute("data-bs-target", "#readData");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-popup-edit");
    editBtn.innerHTML = "edit";
    editBtn.onclick = function () {
      editInfo(
        index,
        element.picture,
        element.employeeName,
        element.employeeCity,
        element.employeeHobi,
        element.employeeQuotes,
        element.employeeAlasan,
        element.employeeMedsos
      );
    };
    editBtn.setAttribute("data-bs-toggle", "modal");
    editBtn.setAttribute("data-bs-target", "#userForm");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-popup-delete");
    deleteBtn.innerHTML = "delete";
    deleteBtn.onclick = function () {
      deleteInfo(index);
    };

    btnContainer.appendChild(readBtn);
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    card.appendChild(img);
    card.appendChild(cardDetails);
    card.appendChild(btnContainer);
    cardContainer.appendChild(card);
  });
}

//fungsi tampilan lihat data
function readInfo(pic, name, city, hobi, quotes, alasan, medsos) {
  (document.querySelector(".showImg").src = pic),
    (document.querySelector("#showName").value = name),
    (document.querySelector("#showCity").value = city);
  document.querySelector("#showHobi").value = hobi;
  document.querySelector("#showQuotes").value = quotes;
  document.querySelector("#showAlasan").value = alasan;
  document.querySelector("#showMedsos").value = medsos;
}

//fungsi tampilan edit data
function editInfo(index, pic, name, City, Hobi, Quotes, Alasan, Medsos) {
  isEdit = true;
  editId = index;
  imgInput.src = pic;
  userName.value = name;
  city.value = City;
  hobi.value = Hobi;
  quotes.value = Quotes;
  alasan.value = Alasan;
  medsos.value = Medsos;
  submitBtn.innerText = "Update";
  modalTitle.innerText = "Update The Form";
}

//fungsi dan notif delete
function deleteInfo(index) {
  if (confirm("Are you sure ??")) {
    getData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(getData));
    showInfo();
  }
}

//JS Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    picture:
      imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
    employeeName: userName.value,
    employeeCity: city.value,
    employeeHobi: hobi.value,
    employeeQuotes: quotes.value,
    employeeAlasan: alasan.value,
    employeeMedsos: medsos.value,
  };

  if (!isEdit) {
    getData.unshift(information); // tak ganti unshift zak
  } else {
    isEdit = false;
    getData[editId] = information;
  }
  localStorage.setItem("userProfile", JSON.stringify(getData));
  submitBtn.innerText = "Submit";
  modalTitle.innerHTML = "Welcome Aboard";
  showInfo();
  form.reset();
  imgInput.src = "./image/Profile Icon.webp";
});
