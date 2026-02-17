const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesList = document.getElementById("notesList");

let notes = [];

function load() {
  let dohvati = localStorage.getItem("notes");
  if (dohvati) {
    notes = JSON.parse(dohvati);
  }
  render();
}

function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function add() {
  let vrijednost = noteInput.value.trim();

  if (!vrijednost) {
    alert("molim vas da upisete nesto");
    return;
  }
  notes.push(vrijednost);
  save();
  render();
  noteInput.value = "";
}

function deleteNote(index) {
  notes.splice(index, 1);
  save();
  render();
}

function render() {
  notesList.innerHTML = "";
  if (notes.length === 0) {
    notesList.innerHTML = `
    <div class ="empty-state">Nema bilješki. Dodaj prvu!</div>`;
    return;
  }

  notes.forEach((note, index) => {
    const noviDiv = document.createElement("div");
    noviDiv.className = "note-item";
    noviDiv.innerHTML = `
    <div class ="note-text">${note}</div>
    <button class ="delete-btn">obrisi</button>
    `;
    const zaObrisat = noviDiv.querySelector(".delete-btn");
    zaObrisat.addEventListener("click", () => deleteNote(index));

    notesList.appendChild(noviDiv);
  });
}
addBtn.addEventListener("click", add);

noteInput.addEventListener("keypress", function (entr) {
  if (entr.key === "Enter") {
    entr.preventDefault();
    add();
  }
});

load();
