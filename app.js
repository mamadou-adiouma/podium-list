"use strict";
const arrayObjStudents = localStorage.getItem("arrayObjStudents")
  ? JSON.parse(localStorage.getItem("arrayObjStudents"))
  : [];
const objsStudents = JSON.parse(localStorage.getItem("arrayObjStudents"));
let objsInfoStudents = {};

const addInfosStudentsBtn = document.querySelector("#add-icon");
const closeFormBtn = document.querySelector("#btn-close-form");
const formContainer = document.querySelector("#form-container");
const formStudents = document.createElement("form");
const studentsTemplate = document.querySelector("#students-template");

const inputNamesStudents = document.createElement("input");
inputNamesStudents.type = "text";
inputNamesStudents.required = true;
inputNamesStudents.id = "input-name";

const inputNotesStudents = document.createElement("input");
inputNotesStudents.type = "text";
inputNotesStudents.required = true;
inputNotesStudents.id = "input-notes";
inputNotesStudents.placeholder = "Entrez ses 3 notes, séparés par des virgules";

const inputSubmit = document.createElement("input");
inputSubmit.type = "submit";
inputSubmit.value = "Ajouter";

formStudents.appendChild(inputNamesStudents);
formStudents.appendChild(inputNotesStudents);
formStudents.appendChild(inputSubmit);

const createForm = () => {
  formContainer.classList.add("active");
  formContainer.appendChild(formStudents);
  getStudentsInfos();
};

const removeForm = () => {
  formContainer.classList.remove("active");
  formContainer.removeChild(formStudents);
};

window.addEventListener("DOMContentLoaded", () => {
  inputNamesStudents.placeholder = `Entrez le nom de l'étudiant - ${1}`;
  inputNamesStudents.placeholder = `Entrez le nom de l'étudiant - ${
    objsStudents.length + 1
  }`;
  arrayObjStudents.sort(byGrade);

  objsStudents.forEach((elmt, index) => {
    document.querySelector("table #tbody").innerHTML += `
      <tr>
           <td>${index + 1}</td>
           <td>${elmt.name}</td>
           <td>[${elmt.notes}]</td>
           <td id="moyenne-candidat-1">${+elmt.moyenne.toFixed(2)}</td>
      </tr>
      `;
  });

  if (arrayObjStudents.length >= 3) {
    document.querySelector("#open-podium").classList.add("active");
  }

  document.querySelector("#best-student-name").textContent =
    arrayObjStudents[0].name;
  // document.querySelector("#best-student-appreciation").innerHTML = `Occupe la premiere place avec une moyenne de <strong> ${arrayObjStudents[0].moyenne.toFixed(2)} / 20 </strong>`;
  // document.querySelector("#best-student-appreciation").innerHTML = `Occupe la premiere place avec une moyenne de <strong> ${arrayObjStudents[0].moyenne == arrayObjStudents[0].moyenne + ".00" ? arrayObjStudents[0].moyenne.toFixed(0) : arrayObjStudents[0].moyenne.toFixed(2)} / 20 </strong>`;
  document.querySelector(
    "#best-student-appreciation"
  ).innerHTML = `Occupe la premiere place avec une moyenne de <strong> ${+arrayObjStudents[0].moyenne.toFixed(
    2
  )} / 20 </strong>`;
  document.querySelector("#best-student-best-note").innerHTML = `${worst(
    arrayObjStudents[0]
  )}`;
  document.querySelector("#best-student-worst-note").innerHTML = `${best(
    arrayObjStudents[0]
  )}`;

  document.querySelector("#seconth-student-name").textContent =
    arrayObjStudents[1].name;
  // document.querySelector("#seconth-student-appreciation").innerHTML = `Occupe la deuxieme place avec une moyenne de <strong> ${arrayObjStudents[1].moyenne.toFixed(2)} / 20 </strong>`;
  // document.querySelector("#seconth-student-appreciation").innerHTML = `Occupe la deuxieme place avec une moyenne de <strong> ${arrayObjStudents[1].moyenne == arrayObjStudents[1].moyenne + ".00" ? arrayObjStudents[1].moyenne.toFixed(0) : arrayObjStudents[1].moyenne.toFixed(2)} / 20 </strong>`;
  document.querySelector(
    "#seconth-student-appreciation"
  ).innerHTML = `Occupe la deuxieme place avec une moyenne de <strong> ${+arrayObjStudents[1].moyenne.toFixed(
    2
  )} / 20 </strong>`;
  document.querySelector("#seconth-student-best-note").innerHTML = `${worst(
    arrayObjStudents[1]
  )}`;
  document.querySelector("#seconth-student-worst-note").innerHTML = `${best(
    arrayObjStudents[1]
  )}`;

  document.querySelector("#thirth-student-name").textContent =
    arrayObjStudents[2].name;
  // document.querySelector("#thirth-student-appreciation").innerHTML = `Occupe la troisieme place avec une moyenne de <strong> ${arrayObjStudents[2].moyenne.toFixed(2)} / 20 </strong>`;
  // document.querySelector("#thirth-student-appreciation").innerHTML = `Occupe la troisieme place avec une moyenne de <strong> ${arrayObjStudents[2].moyenne == arrayObjStudents[2].moyenne + ".00" ? arrayObjStudents[2].moyenne.toFixed(0) : arrayObjStudents[2].moyenne.toFixed(2)} / 20 </strong>`;
  document.querySelector(
    "#thirth-student-appreciation"
  ).innerHTML = `Occupe la troisieme place avec une moyenne de <strong> ${+arrayObjStudents[2].moyenne.toFixed(
    2
  )} / 20 </strong>`;
  document.querySelector("#thirth-student-best-note").innerHTML = `${worst(
    arrayObjStudents[2]
  )}`;
  document.querySelector("#thirth-student-worst-note").innerHTML = `${best(
    arrayObjStudents[2]
  )}`;

  document.querySelector(".percent-first").style.height = `${
    (arrayObjStudents[0].moyenne * 20) / 10 - 12
  }em`;
  document.querySelector(".percent-first").style.backgroundColor =
    "rgb(255, 162, 2)";

  document.querySelector(".percent-second").style.height = `${
    (arrayObjStudents[0].moyenne * 20) / 10
  }dvh`;
  document.querySelector(".percent-second").style.backgroundColor =
    "rgb(2, 255, 69)";

  document.querySelector(".percent-third").style.height = `${percent(
    arrayObjStudents[2]
  )}%`;
  document.querySelector(".percent-third").style.backgroundColor =
    "rgb(5, 56, 151)";

  document.querySelector("#percentage-text-first").textContent = `${(
    (arrayObjStudents[0].moyenne * 20) /
    10
  ).toFixed(0)}%`;
  document.querySelector("#percentage-text-second").textContent = `${(
    (arrayObjStudents[1].moyenne * 20) /
    10
  ).toFixed(0)}%`;
  document.querySelector("#percentage-text-third").textContent = `${(
    (arrayObjStudents[2].moyenne * 20) /
    10
  ).toFixed(0)}%`;

  document.querySelector(
    "#name-text-first"
  ).textContent = `${arrayObjStudents[0].name}`;
  document.querySelector(
    "#name-text-second"
  ).textContent = `${arrayObjStudents[1].name}`;
  document.querySelector(
    "#name-text-third"
  ).textContent = `${arrayObjStudents[2].name}`;
});

const percent = (student) => {
  return (student.moyenne * 20) / 100;
};

const worst = (student) => {
  return `Sa pire note est <span>${student.worst_note}</span>`;
};

const best = (student) => {
  return `Sa meilleure note est <span>${student.best_note}</span>`;
};

const getStudentsInfos = () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      !(
        inputNamesStudents.value.trim() === "" ||
        inputNotesStudents.value.trim() === ""
      )
    ) {
      const isValidChars = /^[a-zA-Z\s*]+(\s*[a-zA-Z]+)$/;
      // const isValidNumeric = /^(\d+\s*,\s*\d+\s*,\s*\d+)/;
      const isValidNumeric =
        /^(\d+(\.\d+)?\s*,\s*\d+(\.\d+)?\s*,\s*\d+(\.\d+)?)$/;

      const verifiedNote = (num) => {
        return !isNaN(num) && num >= 0 && num <= 20;
        // if (!isNaN(num) && num >= 0 && num <= 20) {
        //   return true;
        // } else {
        //   alert("Les notes doivent être dans l'interval [0-20] inclus. ");
        //   e.preventDefault();
        //   form.reset();
        //   return;
        // }
      };

      const validatedNoteIsOk = inputNotesStudents.value
        .trim()
        .split(",")
        .map((note) => Number(note.trim()))
        .every(verifiedNote);

      if (!validatedNoteIsOk) {
        alert(
          "Veuillez entrer des notes au format: 19,17,15 et dans l'interval [0-20] inclus."
        );
        e.preventDefault();
        form.reset();
        return;
      }

      if (
        inputNotesStudents.value.match(isValidNumeric) !== null &&
        validatedNoteIsOk
      ) {
        if (!inputNamesStudents.value.match(isValidChars)) {
          alert("Veuillez saisir des caracteres valides pour le champs nom !");
          e.preventDefault();
          form.reset();
          return;
        } else {
          objsInfoStudents.name = inputNamesStudents.value.trim();
        }

        objsInfoStudents.notes = inputNotesStudents.value
          .trim()
          .split(",")
          .map((note) => Number(note.trim()));

        if (objsInfoStudents.notes.length === 3) {
          arrayObjStudents.push(objsInfoStudents);
          arrayObjStudents.sort(byGrade);
        } else {
          alert(
            "Veuillez entrer exactement trois notes séparés par des virgules !"
          );
          e.preventDefault();
          form.reset();
        }
      }

      objsInfoStudents.moyenne = moyenne(objsInfoStudents.notes);
      objsInfoStudents.worst_note = Math.min(...objsInfoStudents.notes);
      objsInfoStudents.best_note = Math.max(...objsInfoStudents.notes);

      localStorage.setItem(
        "arrayObjStudents",
        JSON.stringify(arrayObjStudents)
      );
      location.reload();
    } else {
      alert("Veuillez remplir correctement les champs !");
      e.preventDefault();
      form.reset();
    }
  });
};

const byGrade = (a, b) => {
  return b.moyenne - a.moyenne;
};

const moyenne = (notes) => {
  return notes.reduce((acc, curr) => acc + curr, 0) / notes.length;
};

document.querySelector("#open-podium").addEventListener("click", () => {
  document.querySelector("#podium-container").classList.add("active");
});

document.querySelector("#close-podium").addEventListener("click", () => {
  document.querySelector("#podium-container").classList.remove("active");
});

addInfosStudentsBtn.addEventListener("click", createForm);
closeFormBtn.addEventListener("click", removeForm);
