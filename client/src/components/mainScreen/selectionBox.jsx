import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";


class SelectionBox extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            playerName: "isaac",
            difficulty: "easy",
            genreID: "",
            genre: "",
            choice: "Pick a Selection",
            difficultySelected: true,
            genreSelected: false,
            playerPicked: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeGenre = this.onChangeGenre.bind(this)
    }   

         onChangePlayerName(e) {
            this.setState({
                playerName: e
            })
        }
        onChangeDifficulty(e) {
            this.setState({
                difficulty: e,
                difficultySelected: true,
                choice: ""
            })
        }
        onChangeGenre(e) {
            let genrePicked;
            if (e === 27) {
                genrePicked = 'Animals'
            } else if (e === 21) {
                genrePicked = 'Sports'
            } else {
                genrePicked = 'History'
            }
            this.setState({
                genreID: e,
                genre: genrePicked,
                genreSelected: true,
                choice: ""
            })
        }
        handleChange(event) {
            this.setState({playerName: event.target.value});
          }
        handleSubmit(e) {
            e.preventDefault();
            this.setState({playerName: e.target.value, playerPicked: true});
        }

    render () {
        return (
        <div className="center">
        <h1> Welcome to the Quiz Games! </h1>

           <div className={this.state.playerPicked === true ?  'showName' : 'hide' }> Welcome Player {this.state.playerName}!</div>
        <div className={this.state.playerPicked === true ? 'hide' : 'showname' }>
        <form> 
        <label>
        Enter Name:
        <input type="text" onChange={this.handleChange}/>
        </label>
        <button value={this.state.playerName} onClick={this.handleSubmit}> lock in name </button>
        </form>
         </div>

        <div className="dropdown">
            <button className="dropbtn">{this.state.choice} {this.state.genre}</button>
            <div className="dropdown-content">
            {/* numbers in function correlate to api category numbers */}
            <a href="#" onClick={this.onChangeGenre.bind(this, 27)}>Animals</a>
            <a href="#" onClick={this.onChangeGenre.bind(this, 21)}>Sports</a>
            <a href="#" onClick={this.onChangeGenre.bind(this, 23)}>History</a>
            </div>
            <div className={this.state.difficultySelected === true ? 'show' : 'hide' }>You have Selected genre {this.state.genre} </div>
        </div>

       
        <div className="dropdown">
            <button className="dropbtn">{this.state.choice} {this.state.difficulty}</button>
            <div className="dropdown-content">
            <a href="#" onClick={this.onChangeDifficulty.bind(this, 'easy')}>Easy</a>
            <a href="#" onClick={this.onChangeDifficulty.bind(this, 'medium')}>Medium</a>
            <a href="#" onClick={this.onChangeDifficulty.bind(this, 'hard')}>Hard</a>
            </div>
            <div className={this.state.genreSelected === true ? 'show' : 'hide' }>You have Selected {this.state.difficulty} difficulty</div>
        </div> 

        <Link 
        to={
            { 
                pathname: "/game",
                state: {
                    playerName: this.state.playerName,
                    difficulty: this.state.difficulty,
                    genre: this.state.genre,
                    genreID: this.state.genreID
                  }
            }
        }

        className={this.state.difficultySelected && this.state.genreSelected && this.state.playerPicked ? 'top-spacing' : 'hide' } 
        >Click to Enter Game {this.state.playerName} 
        </Link>

        </div>
        );
    }
}

export default SelectionBox
