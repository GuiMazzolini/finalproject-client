import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "./services/service";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AllRecipes from "./pages/AllRecipes/AllRecipes";


import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRecipes from "./components/AddRecipe/AddRecipe";
import RecipesDetails from "./pages/RecipesDetails/RecipesDetails";
import RecipePlanner from  "./pages/RecipePlanner/RecipePlanner"
import ShoppingList from "./pages/ShoppingList/ShoppingList";


function App() {
  
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    service.getRecipes()
    .then((data) => {
      setRecipes(data)
    })
    .catch((err) => console.log(err));
  }, [])



  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage recipes={recipes} />} />
        <Route path="/recipes" element={<AllRecipes recipes={recipes}/>} />
        <Route path="/profile"
               element={
                <IsPrivate>
                  <ProfilePage recipes={recipes}/>
                </IsPrivate>
              }
        />
        <Route path="/addrecipes"  element={<IsPrivate> <AddRecipes /> </IsPrivate>} />
        <Route path="/signup"
               element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
                }
        />
        <Route path="/recipes/:recipesId" element={<RecipesDetails />} />
        <Route path="/planner" element={<IsPrivate><RecipePlanner recipes={recipes}/></IsPrivate>} />
        <Route path="/shoppinglist" element={<ShoppingList recipes={recipes}/>} />

        <Route path="/login"
              element={
                <IsAnon>
                  <LoginPage />
                </IsAnon>
                }
        />
      </Routes>
    </div>
  );
}

export default App;
