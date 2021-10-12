import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StartPage from '../components/mainScreen/startPage.jsx'
import Game from '../components/game/game.jsx'
import Lost from '../components/lost/lost.jsx'
import Won from '../components/won/won.jsx'



const AppRouter = () => (
    <BrowserRouter>
      <div>
        <Switch>
          <Route component={StartPage} path="/" exact={true} />
          <Route component={Game} path="/game" exact={true}/>
          <Route component={Lost} path="/lost" exact={true}/>
          <Route component={Won} path="/won" exact={true}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
  
  export default AppRouter;
