import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Books from './Books';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    const isAuth = this.props.auth0.isAuthenticated;

    return (
      <>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
          <Route exact path="/">
              {isAuth ? <Books /> : <Login />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route exact path="/profile">
              {isAuth && <Profile />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
     
          </Switch>
    
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);


