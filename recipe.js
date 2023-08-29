// Get references to HTML elements
const recipeForm = document.getElementById("recipe-form");
const recipeNameInput = document.getElementById("recipe-name");
const ingredientsInput = document.getElementById("ingredients");
const stepsInput = document.getElementById("steps");
const imageUrlInput = document.getElementById("image-url");
const recipeList = document.getElementById("recipe-list");

// Initialize an array to store our recipes
let recipes = [];

// Variable to keep track of the recipe being edited
let recipeBeingEdited = null;

// Function to fetch recipes from the API
async function fetchRecipes() {
  try {
    const response = await fetch('http://localhost:8000/recipes');
    recipes = await response.json();
    displayRecipes();
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Function to display recipes
function displayRecipes() {
  // Clear any existing recipes in the DOM
  recipeList.innerHTML = '';
  
  // Loop through the recipes array and display each one
  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <img src="${recipe.imageURL}" alt="${recipe.name}" class="recipe-image">
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Steps:</strong> ${recipe.steps}</p>
    `;

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async function() {
      try {
        const response = await fetch(`http://localhost:8000/recipes/${recipe.id}`, {
          method: 'DELETE'
        });
        if (response.status === 200) {
          fetchRecipes(); // Refresh the recipes
        }
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    });

    // Edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', function() {
      recipeBeingEdited = recipe.id;
      recipeNameInput.value = recipe.name;
      ingredientsInput.value = recipe.ingredients;
      stepsInput.value = recipe.steps;
      imageUrlInput.value = recipe.imageURL;
    });

    recipeDiv.appendChild(deleteButton);
    recipeDiv.appendChild(editButton);
    recipeList.appendChild(recipeDiv);
  });
}

// Event listener for form submission
recipeForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  // Capture input variables
  const recipeName = recipeNameInput.value;
  const ingredients = ingredientsInput.value;
  const steps = stepsInput.value;
  const imageUrl = imageUrlInput.value;

  // Create a new recipe object
  const newRecipe = {
    name: recipeName,
    ingredients: ingredientsInput.value.split(','),
    steps: steps,
    imageURL: imageUrl
  };

  try {
    let url = 'http://localhost:8000/recipes';
    let method = 'POST';

    if (recipeBeingEdited !== null) {
      url = `http://localhost:8000/recipes/${recipeBeingEdited}`;
      method = 'PUT';
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRecipe)
    });

    if (response.status === 200) {
      recipeForm.reset();
      recipeBeingEdited = null;
      fetchRecipes(); // Refresh the recipes
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
  }
});

// Fetch recipes on page load
fetchRecipes();
