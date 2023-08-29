# Recipe Keeper

## Overview

Recipe Keeper is a full-stack web-based application that allows users to conveniently store and manage their favorite recipes. With a clean, modern interface and a dark theme that emphasizes vibrant elements, this application combines aesthetic and functional appeal.

## Features

- **Add New Recipe**: Users can create a new recipe by filling out a form that includes the recipe's name, an image URL, ingredients, and preparation steps.
  
- **List Recipes**: Recipes are displayed in an organized grid layout, complete with their names, images, ingredients, and preparation steps.
  
- **Edit Recipe**: Recipes can be easily updated. Just click the 'Edit' button next to the recipe you wish to modify.
  
- **Delete Recipe**: If you no longer need a recipe, simply click the 'Delete' button next to it to remove it from the list.
  
- **Persistent Storage**: Unlike other solutions that only use browser local storage, Recipe Keeper utilizes a JSON file on the server, ensuring that your recipes are stored persistently.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- FastAPI
- Python
- JSON File Storage

## Installation and Usage

1. Clone this repository to your local machine.
  
2. Navigate to the directory where the repository is cloned and install FastAPI and Uvicorn if you haven't already:
    ```bash
    pip install fastapi uvicorn
    ```

3. Start the FastAPI backend:
    ```bash
    uvicorn api:app --reload
    ```
    Note: This assumes that `api` is the name of your Python file and `app` is the name of your FastAPI instance within that file.

4. Open the `index.html` file in your browser or start your frontend development server if applicable.
  
5. You're all set! Start adding your favorite recipes to your Recipe Keeper.

## Future Enhancements

- Implement user authentication to allow multiple users to have separate collections of recipes.
  
- Add category and search functionalities to improve the user experience.

---

Made with :heart: by Evan