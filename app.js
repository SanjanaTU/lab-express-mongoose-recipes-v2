const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require('./models/Recipe.model');

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! express-mongoose-recipes-dev: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post("/recipes", async (req, res) => {
    try {
      const newRecipe = await Recipe.create(req.body);
      res.status(201).json({ recipe: newRecipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get("/recipes", async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(200).json({ recipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get("/recipes/:recipeId", async (req, res) => {
    const { recipeId } = req.params;
    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
      } else {
        res.status(200).json({ recipe });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put("/recipes/:recipeId", async (req, res) => {
    const { recipeId } = req.params;
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, { new: true });
      if (!updatedRecipe) {
        res.status(404).json({ message: "Recipe not found" });
      } else {
        res.status(200).json({ recipe: updatedRecipe });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipesId', async (request, response) => {
    const { recipesId } = request.params
  
    await Recipe.findByIdAndDelete(recipesId)
    response.status(202).json({ message: 'Recipe deleted' })
  })

// BONUS
//  Bonus: Iteration 9 - Create a Single User
//  POST  /users route


//  Bonus: Iteration 10 | Get a Single User
//  GET /users/:id route


//  Bonus: Iteration 11 | Update a Single User
//  GET /users/:id route


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;