import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrenUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import AuthPage from './pages/auth/auth.component'
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import './App.css'

class App extends Component{

authSubscription = null;  

componentDidMount(){
  const {setCurrenUser} = this.props;

  this.authSubscription = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrenUser({
            id: snapShot.id,
            ...snapShot.data()
        });
      });

      
    } else{
      setCurrenUser(userAuth);
    }
  });
}

componentWillUnmount(){
  this.authSubscription();
}

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route 
          exact 
          path='/signin' 
          render={() => 
          this.props.currentUser ? (
          <Redirect to='/' />
          ) : (
          <AuthPage />
          )}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchProps = dispatch => ({
  setCurrenUser: user => dispatch(setCurrenUser(user))
});

export default connect(mapStateToProps, mapDispatchProps)(App);
