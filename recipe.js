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

// Load recipes from local storage
if (localStorage.getItem('recipes')) {
    recipes = JSON.parse(localStorage.getItem('recipes'));
    displayRecipes();
}

// Function to save recipes to local storage
function saveRecipesToLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
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
            <img src="${recipe.imageUrl}" alt="${recipe.name}" class="recipe-image">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Steps:</strong> ${recipe.steps}</p>
        `;
      
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', function() {
            recipes.splice(index, 1);
            saveRecipesToLocalStorage();
            displayRecipes();
        });

        // Edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.addEventListener('click', function() {
            recipeBeingEdited = index;
            recipeNameInput.value = recipe.name;
            ingredientsInput.value = recipe.ingredients;
            stepsInput.value = recipe.steps;
            imageUrlInput.value = recipe.imageUrl;
        });

        recipeDiv.appendChild(deleteButton);
        recipeDiv.appendChild(editButton);
        recipeList.appendChild(recipeDiv);
    });
}

// Event listener for form submission
recipeForm.addEventListener('submit', function(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Capture input variables
    const recipeName = recipeNameInput.value;
    const ingredients = ingredientsInput.value;
    const steps = stepsInput.value;
    const imageUrl = imageUrlInput.value;

    // Create a new recipe object
    const newRecipe = {
        name: recipeName,
        ingredients: ingredients,
        steps: steps,
        imageUrl: imageUrl
    };

    // Check if a recipe is being edited
    if (recipeBeingEdited !== null) {
        recipes[recipeBeingEdited] = newRecipe;
        recipeBeingEdited = null;
    } else {
        recipes.push(newRecipe);
    }

    // Save recipes to local storage and update the DOM
    saveRecipesToLocalStorage();
    displayRecipes();

    // Clear the input fields
    recipeForm.reset();
});
