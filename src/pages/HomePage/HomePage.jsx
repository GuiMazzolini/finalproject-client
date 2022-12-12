import "./HomePage.css";
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import service from "../../services/service";

function HomePage() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    service.getRecipes()
    .then((data) => {
      setRecipes(data)
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <div>
      <h1>New Recipes</h1>
      <div className="new-container">
      {recipes && recipes.map((recipe) => ( 
        <div key={recipe.id}>
      <Card className="container-card">
        <Card.Img className="img-home" variant="top" src={recipe.imageUrl} />
        <Card.Body>
          <Card.Text>{recipe.name}</Card.Text>
        </Card.Body>
      </Card>
      </div>
      ) )}
      </div>

    </div>
  );
}

export default HomePage;
