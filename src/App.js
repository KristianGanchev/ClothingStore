import './App.css'
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import AuthPage from './pages/auth/auth.component'
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";

class App extends Component{
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

authSubscription = null;  

componentDidMount(){
  this.authSubscription = auth.onAuthStateChanged(user => {
    this.setState({ currentUser: user });
    console.log(user);
  });
}

componentWillUnmount(){
  this.authSubscription();
}

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={AuthPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
