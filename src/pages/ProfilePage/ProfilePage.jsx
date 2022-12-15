import "./ProfilePage.css";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import PlannerRecipeCard from "../../components/RecipeCard/PlannerRecipeCard";
import PlannerService from "../../services/plannerService";


function ProfilePage({ recipes }) {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [userId, setUserId] = useState("")
  const [savedInPlanner, setSavedInPlanner] = useState([])

  function getPlanners() {
    PlannerService
      .getPlanner()
      .then((data) =>
        setSavedInPlanner(data))
  }

  useEffect(() => {
    user && setUserId(user._id);
    getPlanners()
  }, [])

  function handleDelete(e) {

    PlannerService
      .deletePlanner(e)
      .then((response) => {
        console.log("deleted from database")
      })
      .catch((err) => console.log(err));
    getPlanners()
    navigate("/profile")
  }

  return (
    <>
      <h1 className="welcome">Welcome {user.name}</h1>
      <div className="profile-container">
        <div className="your-recipes-container">
          <h4>Your Recipes</h4>
          <div className="your-recipes">
            {recipes && recipes.map((recipe) => {

              if (recipe?.user?._id === userId) {
                return (
                  <div className="clay clay-size">
                    <PlannerRecipeCard key={recipe._id} {...recipe} />
                  </div>)
              }
              return null;
            })}
          </div>
        </div>
        <div className="profile-planner-container">
          <h4>Saved Meal Plans</h4>

          {savedInPlanner && savedInPlanner?.map((planner) => {
            { console.log(planner._id) }


            if (planner?.user?._id === userId) {

              function hideShow() {
                let x = document.getElementById(planner?._id);
                if (x.style.display === "none") {
                  x.style.display = "block";
                } else {
                  x.style.display = "none";
                }
              }
              return (
                < >
                  <div className="profile-planner">
                    <img onClick={hideShow} src="../arrowdown.png" width="15px" height="15px" />
                    <p onClick={hideShow}> Name: {planner?.name} </p>

                    <p onClick={hideShow}> Date: {planner?.createdAt.slice(0, 10).split('-').reverse().join('/')}</p>
                    <img src="https://findicons.com/files/icons/1262/amora/256/delete.png"
                      width="25px" height="25px" onClick={() => handleDelete(planner._id)} />
                  </div>
                  <div className="planer-meals" id={planner?._id}>
                    {planner.recipes.map((recipe) => {

                      const inner = recipes?.map(el => {
                        return (recipe?._id === el?._id ? <div className="meals-results">
                              <Link className="link" to={`/recipes/${recipe._id}`}>
                                {recipe.quantity} X <img className="meal-center-result" src={el.imageUrl} width="100px" height="100px" /> {el.name} 
                              </Link>
                                 </div>
                          : null
                        )
                      })
                      return (
                        <div className="inner-planner">
                          {inner}
                        </div >
                      )
                    })}
                  </div>
                </>
              )
            }
          })}

        </div>
      </div>
    </>
  );
}

export default ProfilePage;
