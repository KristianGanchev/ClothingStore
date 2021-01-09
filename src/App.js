import Homepage from "./pages/homepage/homepage.component";
import './App.css'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
