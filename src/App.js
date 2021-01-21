import { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { chekUserSession } from "./redux/user/user.actions";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import AuthPage from './pages/auth/auth.component'
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import './App.css'

class App extends Component {

  authSubscription = null;

  componentDidMount() {
    const { chekUserSession } = this.props;
    chekUserSession();
  }

  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    return (
      <div>
        <Header />
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
                )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  chekUserSession: () => dispatch(chekUserSession())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
