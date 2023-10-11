document.addEventListener('DOMContentLoaded', () => {

})
// JavaScript code for your assignment

// Function to fetch and render dogs from the API
function fetchAndRenderDogs() {
    fetch('http://localhost:3000/dogs')
      .then((response) => response.json())
      .then((dogs) => {
        const table = document.querySelector('#dog-table');
        table.innerHTML = ''; // Clear the table
  
        dogs.forEach((dog) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button data-id="${dog.id}" class="edit-btn">Edit</button></td>
          `;
          table.appendChild(row);
        });
      });
  }
  
  // Function to populate the edit form with dog data
  function populateEditForm(dog) {
    const form = document.querySelector('#dog-form');
    form.querySelector('input[name="name"]').value = dog.name;
    form.querySelector('input[name="breed"]').value = dog.breed;
    form.querySelector('input[name="sex"]').value = dog.sex;
    form.dataset.id = dog.id;
  }
  
  // Event listener for edit buttons
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
      const dogId = event.target.getAttribute('data-id');
      fetch(`http://localhost:3000/dogs/${dogId}`)
        .then((response) => response.json())
        .then((dog) => {
          populateEditForm(dog);
        });
    }
  });
  
  // Event listener for the form submission
  document.querySelector('#dog-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const dogId = event.target.dataset.id;
    const updatedDog = {
      name: event.target.name.value,
      breed: event.target.breed.value,
      sex: event.target.sex.value,
    };
  
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
    })
      .then(() => {
        fetchAndRenderDogs(); // Fetch and render the updated dog list
        event.target.reset(); // Reset the form
      });
  });
  
  // Initial fetch and render when the page loads
  fetchAndRenderDogs();
  