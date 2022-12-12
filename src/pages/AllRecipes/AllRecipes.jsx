import "./AllRecipes.css"
import service from "../../services/service";
import { useState, useEffect } from "react";
import RecipeCard from '../../components/RecipeCard/RecipeCard';


function AllRecipes() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
      service.getRecipes()
      .then((data) => {
        setRecipes(data)
      })
      .catch((err) => console.log(err));
    }, [])

    return (
        <>
            <h1 className='recipes-title'>All Recipes</h1>
            <div className='all-recipes-container'>
              {recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)}
            </div>
        </>
  );
}

export default AllRecipes;
