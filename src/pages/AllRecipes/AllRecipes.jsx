import "./AllRecipes.css"
import { useState } from "react";
import RecipeCard from '../../components/RecipeCard/RecipeCard';


function AllRecipes({recipes}) {
  const [search, setSearch] = useState("");
  const filtered = recipes.filter((oneData) => {
    console.log(oneData)
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

    return (
      
        <>
          <div className="title-search">
            <h1 className='recipes-title'>All Recipes</h1>
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
          <div className='all-recipes-container'>
            {filtered.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />)}
          </div>
        </>
  );
}

export default AllRecipes;
