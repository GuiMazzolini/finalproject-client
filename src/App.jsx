import "./App.css";
import { Routes, Route } from "react-router-dom";

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
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<AllRecipes />} />
        <Route path="/profile"
               element={
                <IsPrivate>
                  <ProfilePage />
                </IsPrivate>
              }
        />
        <Route path="/addrecipes" element={<AddRecipes />} />
        <Route path="/signup"
               element={
                <IsAnon>
                  <SignupPage />
                </IsAnon>
                }
        />
        <Route path="/recipes/:recipesId" element={<RecipesDetails />} />
        <Route path="/planner" element={<RecipePlanner />} />
        <Route path="/shoppinglist" element={<ShoppingList />} />

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
