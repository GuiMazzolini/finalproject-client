import "./HomePage.css";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

function HomePage({recipes}) {

  return (
    <div className="home-container">
      <h1>Brand New Recipes</h1>
      <Carousel>
    {recipes?.slice(recipes?.length - 6).reverse().map((recipe) => (
      <Carousel.Item className="carousel-item" key={recipe?.id} interval={3000}>
        <Link className="link" to={`/recipes/${recipe._id}`}>
          <img
            className="d-block w-100"
            src={recipe?.imageUrl}
            alt="First slide"/>
          <Carousel.Caption>
            <h3>{recipe?.name}</h3>
          </Carousel.Caption>
        </Link>
      </Carousel.Item>
   
      ))}
          
    </Carousel>

    </div>
  );
}

export default HomePage;
