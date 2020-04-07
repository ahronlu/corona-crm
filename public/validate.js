function validate(form) {
  let isValid = true;
  let errors = form.querySelectorAll('.invalid-feedback');
  for (let error of errors) {
    error.style.display = 'none';
  }

  if (!form.over18.checked) {
    form.querySelector('.over18 .invalid-feedback').style.display = 'block';
    isValid = false;
  }

  if (!isFullName(form.fullName.value)) {
    form.querySelector('.fullName .invalid-feedback').style.display = 'block';
    isValid = false;
  }

  if (!isEmail(form.email.value)) {
    form.querySelector('.email .invalid-feedback').style.display = 'block';
    isValid = false;
  }

  return isValid;
}

function isEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isFullName(fullName) {
  const parts = fullName.split(' ');
  return parts.length === 2;
}
