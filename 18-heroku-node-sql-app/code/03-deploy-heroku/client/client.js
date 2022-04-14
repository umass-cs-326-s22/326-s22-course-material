import * as crud from './crud.js';

const idText = document.getElementById('id');
const nameText = document.getElementById('name');
const ageText = document.getElementById('age');
const createButton = document.getElementById('create');
const readButton = document.getElementById('read');
const updateButton = document.getElementById('update');
const deleteButton = document.getElementById('delete');
const output = document.getElementById('output');
const all = document.getElementById('all');

async function allPeople() {
  const allPeople = await crud.readAllPeople();
  all.innerHTML = JSON.stringify(allPeople);
}

createButton.addEventListener('click', async (e) => {
  const id = idText.value;
  const name = nameText.value;
  const age = ageText.value;
  const person = await crud.createPerson(id, name, age);
  output.innerHTML = JSON.stringify(person);
  await allPeople();
});

readButton.addEventListener('click', async (e) => {
  const id = idText.value;
  const person = await crud.readPerson(id);
  output.innerHTML = JSON.stringify(person);
  await allPeople();
});

updateButton.addEventListener('click', async (e) => {
  const id = idText.value;
  const name = nameText.value;
  const age = ageText.value;
  const person = await crud.updatePerson(id, name, age);
  output.innerHTML = JSON.stringify(person);
  await allPeople();
});

deleteButton.addEventListener('click', async (e) => {
  const id = idText.value;
  const name = nameText.value;
  const age = ageText.value;
  const person = await crud.deletePerson(id);
  output.innerHTML = JSON.stringify(person);
  await allPeople();
});

allPeople();
