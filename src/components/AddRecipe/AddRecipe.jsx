import "./AddRecipe.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import service from "../../services/service";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005";

function AddRecipes(props) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    const [time, setTime] = useState("")
    const [serving, setServing] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [prepare, setPrepare] = useState([]);

    const [newStep, setNewStep] = useState("")
    const [newIngredient, setNewIngredient] = useState(
        {quantity: "" ,
         measure: "",
         ingredient: ""})

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState("")

    useEffect(()=> {
      user && setUserId(user._id)
    }, [user])
      
    const handleFileUpload = (e) => {
    const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);
      service
        .uploadImage(uploadData)
        .then(response => {
          setImageUrl(response.imageUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };


  const handleSubmit = (e) => {
        e.preventDefault();
          const storedToken = localStorage.getItem('authToken');
          const requestBody = JSON.stringify({name, type, serving, ingredients, time, prepare, imageUrl, user: userId})
          const requestConfig = {headers: {"Content-Type" : "application/json", Authorization: `Bearer ${storedToken}`}}
          axios
          .post(`${API_URL}/recipes/`, requestBody, requestConfig)
          .then((response) => {
                setName("");
                setType("");
                setTime("");
                setServing(0);
                setIngredients([]);
                setPrepare([]);
                setImageUrl("")

                navigate("/")

          })
          .catch((error) => console.log(error));
}

    const handleNewIngredients = (e) => {
        const { name, value } = e.target
        setNewIngredient({
            ...newIngredient, [name]: value }
        )
    }

    const addIngredients = () => {
        setIngredients([...ingredients, newIngredient])
        setNewIngredient({quantity: "" ,
                          measure: "",
                          ingredient: ""})
        
    }

    const handleNewStep = (e) => {
        const { value } = e.target
        setNewStep(value)
    }

    const addSteps = () => {
        setPrepare([...prepare, newStep])
        setNewStep("")   
    }
    return (

    <Form onSubmit={handleSubmit} className="add-form">
      <Form.Group className="mb-3">
        <Form.Label>Name of the recipe</Form.Label>
        <Form.Control type="text" onChange={(e) => setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Servings</Form.Label>
        <Form.Control type="number" onChange={(e) => setServing(e.target.value)}/>
        <Form.Label>Time to prepare</Form.Label>
        <Form.Control type="text" onChange={(e) => setTime(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Upload an Image</Form.Label>
        <Form.Control type="file" onChange={(e) => handleFileUpload(e)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Type of Food</Form.Label>
        <Form.Select onChange={(e) => setType(e.target.value)}>
          <option defaultValue></option>
          <option>Lunch / Dinner</option>
          <option>Desserts</option>
          <option>Breakfast</option>
        </Form.Select>
        </Form.Group>
        <Form.Label>Add Ingredients</Form.Label>
        <InputGroup className="mb-3">
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
        {prepare.length ? prepare.map((eachStep) => {return `${eachStep}, ` }): <p></p>} 
      <Button type="submit"> Create! </Button>
    </Form>
    )
    }


    export default AddRecipes;