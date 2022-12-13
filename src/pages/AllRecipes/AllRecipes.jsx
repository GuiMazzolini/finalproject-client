import "./AllRecipes.css"
import service from "../../services/service";
import { useState, useEffect } from "react";
import RecipeCard from '../../components/RecipeCard/RecipeCard';


function AllRecipes({recipes}) {

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
