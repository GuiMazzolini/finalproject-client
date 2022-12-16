import "./ShoppingList.css"
import {useState, useEffect} from "react";
import PlannerService from "../../services/plannerService"
import { AccordionCollapse } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


function ShoppingList({recipes}) {

    const [plannerList, setPlannerList] = useState([]);
    let shoppingList;
    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState("")


    useEffect(() => {
        PlannerService
        .getPlanner()
        .then((data) => 
        setPlannerList(data))
    
        }, []);
    
    let lastPlann =  plannerList?.slice(plannerList.length -1) 

    let mapRecipes =  lastPlann?.map((each) => { return each.recipes }) 
 
    let allIds = []
        mapRecipes?.forEach(recipe => {
        for (let item of recipe) {
         allIds?.push(item?._id)
        }
      }) 

    return (
        <div className="container-shopping-meal">
         <div className="meals-list">
         <h1>Meal Plann</h1>
        {lastPlann[0]?.recipes.map((recipe) => {

const inner = recipes?.map(el => {

return (recipe?._id === el?._id ? <p>{recipe?.quantity} X <img className="meal-center-result" src={el?.imageUrl} width="100px" height="100px" /> {el.name}</p>
: null
)
})

return (
        <>
          {inner}
        </>
)
})}
    </div>

    <div className="shopping-list">
    <h1>Shopping List</h1>
    <ul>
        {lastPlann[0]?.recipes.map((recipe) => {

            const inner = recipes?.map(el => {
           
        return (recipe?._id === el?._id ? shoppingList = el?.ingredients.map((item) => {return <li ><input id="checkboxes" type="checkbox" />{item.quantity * recipe.quantity} {item.measure} of {item?.ingredient}</li>
            }) : null
  )
})
return (
    <>
       
        {shoppingList}
    </>
)
})}
    </ul>
    </div>
        </div>
        )
}



export default ShoppingList  