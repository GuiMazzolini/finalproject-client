import "./RecipePlanner.css"
import PlannerService from "../../services/plannerService"
import { useState, useEffect } from "react";
import PlannerRecipeCard from '../../components/RecipeCard/PlannerRecipeCard';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";


function RecipePlanner({recipes}) {

    const [recipesInPlanner, setRecipesInPlanner] = useState([])
    const [selectedRecipes, setSelectedRecipes] = useState([])

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState("")

    useEffect(()=> {
      user && setUserId(user._id)
    }, [user])
      
      const handleClick = () => {
       PlannerService
       .createPlanner(user, recipesInPlanner)
       setRecipesInPlanner("")

       navigate("/shoppinglist")
      }

      const handleSelect = (recipe) => {
      let objectIndex = recipesInPlanner.findIndex((eachRecipe) => {
        return eachRecipe._id === recipe._id
      })
      if (objectIndex < 0) {
        recipe.quantity=1
        setRecipesInPlanner([recipe, ...recipesInPlanner])
      }
      else {
        let array = [...recipesInPlanner]; 
        array[objectIndex].quantity++;
        setRecipesInPlanner([...array])
      }
      console.log("OBJECT", recipesInPlanner[objectIndex])


      }


      function deleteRecipe(item) {
        let array = [...recipesInPlanner]; 
        let index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            setRecipesInPlanner(array);
        }
      }


return (
  <>
            <h1 className='recipes-title'>Create Your Meal Plan</h1>
          <div className="total-container">
            <div className='meals-container'>
                {recipes.map((recipe) => (
                  <>
                   <div className="clay clay-size">
                  <PlannerRecipeCard key={recipe._id} {...recipe}/>
                  <img className="add-btn" src="https://icons.iconarchive.com/icons/martz90/circle-addon1/48/text-plus-icon.png" width="25px" alt="add button" value={recipe._id}
                  onClick={() =>{ handleSelect(recipe)}} />

                  </div>
                </>
                ))}
            </div>
            <div className="meal-results-container">

              {recipesInPlanner && recipesInPlanner.map((each) => {
            return  <div className="meal-total">
                <img src={each.imageUrl}  width="80px" height="80px"/>
                <p>{each.name}</p>
                <p>{each.quantity}</p>
                <img src="https://findicons.com/files/icons/1262/amora/256/delete.png" onClick={() => deleteRecipe(each)}
                width="25px" height="25px" />
              </div>
})}
              <button className="create-mealplan-btn" onClick={handleClick}> Save and Create Shopping List</button>
            </div>
          </div>
  </>

)



}

export default RecipePlanner;