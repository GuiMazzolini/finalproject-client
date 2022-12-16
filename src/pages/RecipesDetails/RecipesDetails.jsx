import "./RecipesDetails.css"
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import service from "../../services/service";

function RecipesDetails() {
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const { recipesId } = useParams();
  const navigate = useNavigate();


  const getCurrentRecipe = () => {
  
    const storedToken = localStorage.getItem('authToken');

    service.getOne(recipesId, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
      setCurrentRecipe(response)
    
    })
    .catch((err) => console.log(err));
  }
  useEffect(()=> {
    getCurrentRecipe()
  }, [] );

  return (
  
   <>
    {currentRecipe && (

      <div className="details-container">
          <h1> <img className="return-icon"
            onClick={()=> { navigate(-1) }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Back_Arrow.svg/768px-Back_Arrow.svg.png" width="35px"/> 
            {currentRecipe.name}</h1>
                      <div className="details-columns">
                        <div className="details-column"> 
                          <img className="recipe-avatar" src={currentRecipe.imageUrl}/>
                          <p> Serves {currentRecipe.serving} people</p>
                          <p>Category: {currentRecipe.type} </p>
                          <p>Time: {currentRecipe.time} </p>
                        </div>
                        <div className="ingredients-column">
                          <p>Ingredients:</p>
                          <ul> 
                            {currentRecipe.ingredients.map((item) => { 
                            return <li>{item.quantity} {item.measure} {item.ingredient}</li> })}
                          </ul>
                        </div>
                        <div className="method-column">
                          <p> Method:</p>
                          <ol>
                              {currentRecipe.prepare.map((item) => { 
                              return <li>{item}</li> })}
                            </ol>

                        </div>
                      </div>
        </div>
    )
    }
      </>
  );
}

export default RecipesDetails;