import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/layout/navbar";

import Channel from "./pages/channel";
import Login from "./pages/login";
import Logout from "./pages/logout";
import Main from "./pages/main";
import Register from "./pages/register";

import { getSession } from "./services/auth.service";

import "./app.css";
import Account from "./pages/account";

function App() {
  const [ fetched, setFetched ] = useState();
  const [ currentSession, setSession ] = useState();

  const session = { 
    get: () => {
      return currentSession;
    },

    set: (newSession) => {
      return setSession(newSession);
    }
  }

  const resolveUser = async () => {
    const user = await getSession();
    if (user != null) {
      session.set(user);
    }
    setFetched(true);
  }

  useEffect(() => {
    resolveUser();
  }, []);

  return (
    <React.Fragment>
      <Router>
        {
          fetched && (
            <React.Fragment>
              <Navbar session={session} />
              <div className="app">
                <Switch>
                  <Route path="/" exact>
                    <Main session={session}/>
                  </Route>
                  <Route path="/login" exact>
                    <Login session={session} />
                  </Route>
                  <Route path="/register" exact>
                    <Register session={session} />
                  </Route>
                  <Route path="/c/:name">
                    <Channel session={session} />
                  </Route>
                  {
                    session.get() != null && (
                      <React.Fragment>
                        <Route path="/logout" exact>
                          <Logout session={session} />
                        </Route>
                        <Route path="/account" exact>
                          <Account session={session} />
                        </Route>
                      </React.Fragment>
                    )
                  }
                </Switch>
              </div>
            </React.Fragment>
          )
        }
      </Router>
    </React.Fragment>
  );
}

export default App;
