import "./RecipePlanner.css"
import PlannerService from "../../services/plannerService"
import { useState, useEffect } from "react";
import PlannerRecipeCard from '../../components/RecipeCard/PlannerRecipeCard';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../../services/service"


function RecipePlanner() {

    const [allRecipes, setAllRecipes] = useState([])
    const [recipesInPlanner, setRecipesInPlanner] = useState([])
    const [selectedRecipes, setSelectedRecipes] = useState([])

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState("")

    useEffect(()=> {
      user && setUserId(user._id)
    }, [user])
      

    useEffect(() => {
        PlannerService
        .getRecipes()
        .then((data) => {
          setAllRecipes(data)
        })
        .catch((err) => console.log(err));
      }, [])


      const handleClick = () => {
       PlannerService
       .createPlanner(user, recipesInPlanner)
       setRecipesInPlanner("")
      }

      // const handleSelect = () => {
      //   const count = 0
      //   if (recipesInPlanner.findIndex((obj => obj._id == 1)))
      //   count++
      //   console.log(count)
      // }


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
                {allRecipes.map((recipe) => (
                  <>
                   <div className="clay">
                  <PlannerRecipeCard key={recipe._id} {...recipe}/>
                  <img className="add-btn" src="https://icons.iconarchive.com/icons/martz90/circle-addon1/48/text-plus-icon.png" width="25px" alt="add button" value={recipe._id}
                  onClick={() =>{ setRecipesInPlanner([recipe, ...recipesInPlanner]);
                      //  const filtered = recipesInPlanner.filter((one) => one._id == recipe._id)

                }} />

                  </div>
                </>
                ))}
            </div>
            <div className="meal-results-container">

              {recipesInPlanner && recipesInPlanner.map((each) => {
            return  <div className="meal-total">
                <img src={each.imageUrl}  width="80px" height="80px"/>
                <p>{each.name}</p>
                <p></p>
                <img src="https://findicons.com/files/icons/1262/amora/256/delete.png" onClick={() => deleteRecipe(each)}
                width="25px" height="25px" />
              </div>
})}
              <button className="create-mealplan-btn" onClick={handleClick}> Create Meal Plan</button>
            </div>
          </div>
  </>

)



}

export default RecipePlanner;