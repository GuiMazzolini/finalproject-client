import "./RecipeCard.css"
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';

function RecipeCard ( { type, name, _id, serving, time, imageUrl, user } ) {
    console.log(user)
    return (
        <>
            <Link className="link" to={`/recipes/${_id}`}>
                <div className='clay'>
                    <img variant="top" src={imageUrl} alt="Recipe" className='recipe-img'/>
                    <Card.Body>
                        <Card.Title className="card-name">{name}</Card.Title>
                        <Card.Text className='recipe-topics'>
                            <div className='topic'>
                                <p>Type:</p>
                                <p>Time:</p>
                                <p>Servings:</p>
                            </div>
                            <div className='recipe-result'>
                                <p>{type}</p>
                                <p>{time}</p>
                                <p>{serving}</p>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {console.log(user)}
                       { user?.name ? <p><small className="text-muted">Sended by {user?.name}</small></p>: <></> }

                    </Card.Footer>
                </div>
            </Link>
        </>
    );
  }
  
  export default RecipeCard;