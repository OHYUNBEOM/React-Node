import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/Landingpage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';


//Routing 기능 , 어떻게 페이지가 클릭시에 이동되는지 Routing으로 구현
function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its c hildren <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={LandingPage} /> 
          {/* component={?} --> ?가 LandingPage 로 보내주는것을 의미  */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

