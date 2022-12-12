import "./RecipeCard.css"
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function PlannerRecipeCard ( { name, _id, imageUrl} ) {

    return (
        <>
            <Link target="_blank" className="link" to={`/recipes/${_id}`}>
                <img variant="top" src={imageUrl} alt="Recipe" className='recipe-img'/>
                <Card.Title className="card-name">{name}</Card.Title>
            </Link>
      
        </>
    );
  }
  
  export default PlannerRecipeCard;