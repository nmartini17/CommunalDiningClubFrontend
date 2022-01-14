import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style2.css";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AdminPage from "./components/AdminPage";
import Events from "./components/Events";

export default function App({ facade }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade.login(user, pass).then((res) => setLoggedIn(true));
  };
  const signup = (user, pass) => {
    facade.signup(user, pass).then((res) => setSignedUp(true));
  };

  return (
    <Router>
      <div>
        <ul className="header">
          <Header facade={facade} loggedIn={loggedIn} logout={logout} />
        </ul>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/events">
              <Events />
            </Route>
            <Route path="/adminpage">
              <AdminPage facade={facade} />
            </Route>
            <Route path="/login">
              <LoginPage
                login={login}
                logout={logout}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                facade={facade}
              />
            </Route>
            <Route path="/signup">
              <SignupPage
                signup={signup}
                signedUp={signedUp}
                setSignedUp={setSignedUp}
                facade={facade}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div className="container-md">
      <div className="col-sm-4 ">
        <h1>Communal Dining Club</h1>
        <h2>Login as admin to get started.</h2>
      </div>
    </div>
  );
}
