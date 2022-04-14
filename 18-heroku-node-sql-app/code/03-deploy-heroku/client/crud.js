export async function createPerson(id, name, age) {
  const response = await fetch(
    `/person/create?id=${id}&name=${name}&age=${age}`,
    {
      method: 'POST',
    }
  );
  const data = await response.json();
  return data;
}

export async function readPerson(id) {
  const response = await fetch(`/person/read?id=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}

export async function updatePerson(id, name, age) {
  const response = await fetch(
    `/person/update?id=${id}&name=${name}&age=${age}`,
    {
      method: 'PUT',
    }
  );
  const data = await response.json();
  return data;
}

export async function deletePerson(id) {
  const response = await fetch(`/person/delete?id=${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  return data;
}

export async function readAllPeople() {
  const response = await fetch(`/person/all`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
}
