import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from '../components/mainScreen/startPage.jsx'
import Game from '../components/game/game.jsx'



const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route component={StartPage} path="/" exact={true} />
          <Route component={Game} path="/game" />
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;
