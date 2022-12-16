import "./RecipePlanner.css"
import PlannerService from "../../services/plannerService"
import { useState, useEffect } from "react";
import PlannerRecipeCard from '../../components/RecipeCard/PlannerRecipeCard';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";


function RecipePlanner({recipes}) {

    const [recipesInPlanner, setRecipesInPlanner] = useState([])
    const [plannerName, setPlannerName] = useState("")
    const [search, setSearch] = useState("");
    const filtered = recipes.filter((oneData) => {
        if (!oneData.type) {
            return false;
        } else if (!oneData.name) {
            return false;
        } else {
            return (
                oneData.name.toLowerCase().includes(search.toLowerCase()) ||
                oneData.type.toLowerCase().includes(search.toLowerCase())
            );
        }
    });
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const [userId, setUserId] = useState("")

    useEffect(()=> {
      user && setUserId(user._id)
    }, [user])
      
      const handleClick = () => {
       PlannerService
       .createPlanner(user, recipesInPlanner, plannerName)
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
          <div className="title-search">
            <h1 className='recipes-title'>Create Your Meal Plan</h1>
            <div className=" bg-sky-50">
            <h5>Find All the recepies here!</h5>
            <input
                placeholder="Search"
                type="text"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                className="w-96 border rounded border-gray-400 h-10 focus:outline-none pl-4 pr-8 text-gray-700 text-sm text-gray-500"
            />
            </div>
          </div>
          <div className="total-container">
            <div className='meals-container'>
                {filtered.map((recipe) => (
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
            <input type="text" className="inpt-meal-name" placeholder="Plann Name" onChange={(e) => setPlannerName(e.target.value)}/>
              {recipesInPlanner && recipesInPlanner.map((each) => {
            return  <div className="meal-total">
                <img src={each.imageUrl}  width="80px" height="80px"/>
                <p>{each.name}</p>
                <p>{each.quantity}</p>
                <img src="https://findicons.com/files/icons/1262/amora/256/delete.png" onClick={() => deleteRecipe(each)}
                width="25px" height="25px" />
              </div>
})}
              <button className="create-mealplan-btn" onClick={handleClick}> Create Shopping List</button>
            </div>
          </div>
  </>

)



}

export default RecipePlanner;