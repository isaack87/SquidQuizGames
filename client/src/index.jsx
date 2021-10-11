import React from 'react';
import ReactDOM from 'react-dom';
import StartPage from './components/mainScreen/startPage.jsx'

class App extends React.Component {


  render () {
    return (
      <div>
        <StartPage />

      </div>
    )
  }
}


ReactDOM.render(<App />,document.getElementById('App'));

export default App;