import Homepage from "./pages/homepage/homepage.component";
import './App.css'
import { Route, Switch } from 'react-router-dom';
import ShopPage from "./pages/shoppage/shoppage.component";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Homepage}/>
        <Route exact path='/shop' component={ShopPage}/>
      </Switch>
    </div>
  );
}

export default App;
