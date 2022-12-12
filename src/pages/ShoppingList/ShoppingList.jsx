import "./ShoppingList.css"
import {useState, useEffect} from "react";
import PlannerService from "../../services/plannerService"

function ShoppingList() {

    const [recipesList, setDisplayedRecipesList] = useState([]);
    const shoppingList = [];

    useEffect(() => {
        PlannerService
        .getPlanner()
        .then((data) => console.log(data))
        }, []);


    return (
        <>
            <h1>TO AQUI</h1>
        </>
        )
}



export default ShoppingList  