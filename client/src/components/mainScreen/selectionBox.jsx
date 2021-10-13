import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";


class SelectionBox extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            playerName: "",
            difficulty: "",
            rounds: "",
            genreID: "",
            genre: "",
            choice: "Pick a Selection",
            difficultySelected: false,
            roundsSelected: false,
            genreSelected: false,
            playerPicked: false,
            hover: false
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
        onChangeRounds(e) {
            this.setState({
                rounds: e,
                roundsSelected: true,
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
        <h1 className="title"> Welcome to the Quiz Games! </h1>

           <div className={this.state.playerPicked === true ?  'showName' : 'hide' }> Welcome Player {this.state.playerName}!</div>
        <div className={this.state.playerPicked === true ? 'hide' : 'showname' }>
        <form>
        <input type="text" className="form-control barlength" placeholder="Enter Name Here .." onChange={this.handleChange}/>
        <button value={this.state.playerName} onClick={this.handleSubmit}> lock in name </button>
        </form>
         </div>

    <div id="menu">
        <ul>


        <li><a href="#"><div id={this.state.genreSelected === true ? ['c-selected'] : ['icon-top'] } class="icon-chrome1"></div> <div class="title-top">Category</div></a>
            <ul>
                <li><a href="#" onClick={this.onChangeGenre.bind(this, 27)}><div id="icon" class="icon-pie"></div> <div class="title">Animals</div></a></li>
                <li><a href="#" onClick={this.onChangeGenre.bind(this, 21)}><div id="icon" class="icon-pie"></div> <div class="title">Sports</div></a></li>
                <li><a href="#" onClick={this.onChangeGenre.bind(this, 23)}><div id="icon" class="icon-pie"></div> <div class="title">History</div></a></li>
            </ul>
        </li>

        <li><a href="#"><div id={this.state.difficultySelected === true ? ['c-selected'] : ['icon-top'] } class="icon-chrome2"></div> <div class="title-top">Difficulty</div></a>
            <ul>
                <li><a href="#" onClick={this.onChangeDifficulty.bind(this, 'easy')}><div id="icon" class="icon-pie"></div> <div class="title">Easy</div></a></li>
                <li><a href="#" onClick={this.onChangeDifficulty.bind(this, 'medium')}><div id="icon" class="icon-pie"></div> <div class="title">Medium</div></a></li>
                <li><a href="#" onClick={this.onChangeDifficulty.bind(this, 'hard')}><div id="icon" class="icon-pie"></div> <div class="title">Hard</div></a></li>
            </ul>
        </li>

        <li><a href="#"><div id={this.state.roundsSelected === true ? ['c-selected'] : ['icon-top'] } class="icon-chrome3"></div> <div class="title-top">Rounds</div></a>
            <ul>
                <li><a href="#" onClick={this.onChangeRounds.bind(this, '5')}><div id="icon" class="icon-pie"></div> <div class="title">5 Rounds</div></a></li>
                <li><a href="#" onClick={this.onChangeRounds.bind(this, '10')}><div id="icon" class="icon-pie"></div> <div class="title">10 Rounds</div></a></li>
            </ul>
        </li>
    </ul>
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
