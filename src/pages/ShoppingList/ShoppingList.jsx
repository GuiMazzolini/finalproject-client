import "./ShoppingList.css"
import {useState, useEffect} from "react";
import PlannerService from "../../services/plannerService"
import { AccordionCollapse } from "react-bootstrap";

function ShoppingList({recipes}) {

    const [plannerList, setPlannerList] = useState([]);
    const shoppingList = [];

    useEffect(() => {
        PlannerService
        .getPlanner()
        .then((data) => 
        setPlannerList(data))
        }, []);
    
   
    let lastPlann =  plannerList.slice(plannerList.length -1) 
    let mapRecipes =  lastPlann.map((each) => { return each.recipes }) 
    let allIds = []
    mapRecipes.forEach(recipe => {
        for (let item of recipe) {
         allIds.push(item._id)
        }
      }) 

    

    return (
        <>
            {allIds.map((id) => { 
                let foundedObj = recipes.find((oneRecipe)=> oneRecipe._id == id);
                foundedObj ? console.log(foundedObj.ingredients) : console.log("nao rolou");
                let allIngredients = foundedObj.ingredients.map((item) => console.log(item))
                

                return (foundedObj ?<> <ul> {allIngredients}</ul> </> : <p></p>)
               
            })}
        </>
        )
}



export default ShoppingList  