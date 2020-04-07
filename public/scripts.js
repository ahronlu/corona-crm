const API_URL = 'http://localhost:3000';
const newCustomerForm = document.getElementById('new-customer-form');
const editCustomerForm = document.getElementById('edit-customer-form');
const customerList = document.getElementById('customer-list');

refreshCustomerList();

newCustomerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validate(newCustomerForm)) {
    return;
  }

  createCustomer({
    fullName: newCustomerForm.fullName.value,
    email: newCustomerForm.email.value,
    birthDate: newCustomerForm.birthDate.value,
    notes: newCustomerForm.notes.value,
  })
    .then(refreshCustomerList)
    .catch((e) => console.log(e));
});

function createCustomer(customer) {
  return fetch(API_URL + '/customer', {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function openEditCustomerModal(customer) {
  openModal();
  editCustomerForm.setAttribute('data-costumer-id', customer.id);
  editCustomerForm.fullName.value = customer.fullName;
  editCustomerForm.email.value = customer.email;
  editCustomerForm.birthDate.value = customer.birthDate;
  editCustomerForm.notes.value = customer.notes;
}

editCustomerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validate(editCustomerForm)) {
    return;
  }

  closeModal();
  updateCustomer(
    {
      fullName: editCustomerForm.fullName.value,
      email: editCustomerForm.email.value,
      birthDate: editCustomerForm.birthDate.value,
      notes: editCustomerForm.notes.value,
    },
    e.target.dataset.costumerId
  )
    .then(refreshCustomerList)
    .catch((e) => console.log(e));
});

function updateCustomer(customer, customerId) {
  return fetch(API_URL + `/customer/${customerId}`, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function deleteCustomer(customerId) {
  return fetch(API_URL + `/customer/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function getCustomers() {
  return fetch(API_URL + '/customer');
}

function refreshCustomerList() {
  getCustomers()
    .then((res) => res.json())
    .then((customers) => {
      customerList.innerHTML = '';
      customers.forEach((customer) => {
        const row = buildCustomerRow(customer);
        customerList.appendChild(row);
      });
    })
    .catch((e) => console.log(e));
}

function buildCustomerRow(customer) {
  const row = document.createElement('tr');
  row.innerHTML = `
		<td>${customer.id}</td>
		<td>${customer.fullName}</td>
		<td>${customer.email}</td>
		<td>${customer.birthDate}</td>
		<td>---</td>
		<td class="text-center">
            <button class="btn btn-sm btn-edit"><i class="far fa-edit"></i></button>
            <button class="btn btn-sm btn-delete"><i class="far fa-trash-alt"></i></button>
				</td>`;
  row.querySelector('.btn-edit').addEventListener('click', () => {
    openEditCustomerModal(customer);
  });
  row.querySelector('.btn-delete').addEventListener('click', () => {
    deleteCustomer(customer.id)
      .then(refreshCustomerList)
      .catch((e) => console.log(e));
  });
  return row;
}
