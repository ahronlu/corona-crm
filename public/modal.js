const modal = document.getElementById('modal');

document.getElementById('close-modal').addEventListener('click', closeModal);

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}
