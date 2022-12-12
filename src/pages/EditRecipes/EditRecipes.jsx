import "./EditRecipes.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const API_URL = "http://localhost:5005";

function EditRecipes(props) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    const [time, setTime] = useState("")
    const [serving, setServing] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [prepare, setPrepare] = useState([]);

    const navigate =  useNavigate();

    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState("")
  
  
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    service
      .getOne(
        `${API_URL}/recipes/${recipesId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }    
      )
      .then((response) => {
        const editRecipe = response.data;
        const [name, setName] = useState(editRecipe.name);
        const [type, setType] = useState(editRecipe.type);
        const [imageUrl, setImageUrl] = useState(editRecipe.imageUrl)
        const [time, setTime] = useState(editRecipe.time)
        const [serving, setServing] = useState(editRecipe.serving);
        const [ingredients, setIngredients] = useState(editRecipe.ingredients);
        const [prepare, setPrepare] = useState(editRecipe.prepare);
      })
      .catch((error) => console.log(error));
    
  }, [recipesId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, type, imageUrl, time, serving, ingredients, prepare };

    const storedToken = localStorage.getItem('authToken');  

 
    service
    .updateRecipe(`${API_URL}/recipes/${recipesId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then(() => navigate(`/recipes/${recipesId}`));
  };
  
  const deleteOneRecipe = () => {
    const storedToken = localStorage.getItem('authToken');      
      
    service
    .deleteRecipe(`${API_URL}/recipes/${recipesId}`, { headers: { Authorization: `Bearer ${storedToken}` } }           )
    .then(() => navigate("/recipes"))
    .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditProjectPage">
      <h3>Edit the Recipe</h3>

      <form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name of the recipe</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Servings</Form.Label>
        <Form.Control type="number" value={serving} onChange={(e) => setServing(e.target.value)}/>
        <Form.Label>Time to prepare</Form.Label>
        <Form.Control type="text" value={time} onChange={(e) => setTime(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Upload an Image</Form.Label>
        <Form.Control type="file" value={imageUrl} onChange={(e) => handleFileUpload(e)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Type of Food</Form.Label>
        <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
          <option defaultValue></option>
          <option>Lunch / Dinner</option>
          <option>Desserts</option>
          <option>Breakfast</option>
        </Form.Select>
        </Form.Group>
        <Form.Label>Add Ingredients</Form.Label>
        {/* <InputGroup className="mb-3">
            <Form.Control placeholder="Quantity" name="quantity" id= "quantity" value={newIngredient.quantity} onChange={handleNewIngredients}/>
            <Form.Select placeholder="Measure" name="measure" id= "measure" value={newIngredient.measure} onChange={handleNewIngredients}>
                <option defaultValue></option>
                <option value="milliliters">milliliters</option>
                <option value="units">units</option>
                <option value="grams">grams</option>
            </Form.Select>
            <Form.Control type="text" placeholder="Ingredient" name="ingredient" id="ingredient" value={newIngredient.ingredient} onChange={handleNewIngredients}/>
            <InputGroup.Text onClick={addIngredients}> + </InputGroup.Text>
        </InputGroup>
        <div>
         {ingredients.length ? ingredients.map((eachIngredient) => {return `${eachIngredient.quantity} ${eachIngredient.measure} ${eachIngredient.ingredient}, ` }): <p></p>} 
        </div>
        <Form.Label>How to Prepare</Form.Label>
        <InputGroup className="mb-3">
            <Form.Control type="text" onChange={handleNewStep} value={newStep} placeholder="Write step by step here" />
            <InputGroup.Text onClick={addSteps}>+</InputGroup.Text>
        </InputGroup >
        {prepare.length ? prepare.map((eachStep) => {return `${eachStep}, ` }): <p></p>}  */}
      <Button type="submit"> Edit! </Button>
      </form>

      <button onClick={deleteOneRecipe}>Delete Project</button>
    </div>
  );
}

export default EditRecipes;