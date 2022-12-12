import "./Navbar.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


function NavbarComp() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">VMP Community</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="navbar-link" href="/">Home</Nav.Link>
            <Nav.Link className="navbar-link" href="/planner">Create Meal Plan</Nav.Link>
            <Nav.Link className="navbar-link" href="/recipes">View Recipes</Nav.Link>
            <Nav.Link className="navbar-link" href="/addrecipes">Add Recipes</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn && (
              <>
                <Nav.Link className="navbar-link" onClick={logOutUser} >Logout</Nav.Link>

                <Nav.Link className="navbar-link" href="/Profile">Profile</Nav.Link>

                <p className="welcome-msg">Hello {user && user.name}</p>
              </>
            )}
           {!isLoggedIn && (
              <>
                <Nav.Link className="navbar-link" href="/signup">Sign Up</Nav.Link>
                <Nav.Link className="navbar-link" href="/login">Log in</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;







// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/auth.context";

// function Navbar() {
//   // Subscribe to the AuthContext to gain access to
//   // the values from AuthContext.Provider's `value` prop
//   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

//   return (
//     <nav>
//       <Link to="/">
//         <button>Home</button>
//       </Link>

//       {isLoggedIn && (
//         <>
//           <button onClick={logOutUser}>Logout</button>

//           <Link to="/profile">
//             <button>Profile</button>
//             {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
//           </Link>

//           <span>{user && user.name}</span>
//         </>
//       )}

//       {!isLoggedIn && (
//         <>
//           <Link to="/signup">
//             {" "}
//             <button>Sign Up</button>{" "}
//           </Link>
//           <Link to="/login">
//             {" "}
//             <button>Login</button>{" "}
//           </Link>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
