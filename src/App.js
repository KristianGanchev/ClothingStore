import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrenUser } from "./redux/user/user.actions";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import AuthPage from './pages/auth/auth.component'
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
          <Route exact path='/shop' component={ShopPage} />
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchProps = dispatch => ({
  setCurrenUser: user => dispatch(setCurrenUser(user))
});

export default connect(mapStateToProps, mapDispatchProps)(App);
