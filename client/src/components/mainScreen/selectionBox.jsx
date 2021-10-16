import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import styles from './selectionBox.module.css'


class SelectionBox extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            playerName: "isaac",
            difficulty: "easy",
            rounds: "5",
            genreID: "",
            genre: "Random",
            choice: "Pick a Selection",
            difficultySelected: true,
            roundsSelected: true,
            genreSelected: true,
            playerPicked: true,
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
            } else if (e === '') {
                genrePicked = 'Random'
            }else {
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
        <div className="fullscreenbox startbg">
            <div className='registerbox bodySelection' onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })}>
            <h1 className={this.state.playerPicked === false ?  'gametitle rainbow' : 'hide' }> Player Registration </h1>
        <div className={this.state.playerPicked === true ?  'shownamepicked rainbow'  : 'hide' }> Welcome ➜ {this.state.playerName}</div>
        <div className={this.state.playerPicked === true ? 'hidemargin hide' : 'showname' }>
        <form>
        <input type="text" className="barlength signnamebar rainbow" placeholder="Enter Name Here .." onChange={this.handleChange}/>
        <button value={this.state.playerName} onClick={this.handleSubmit} className="lockin rainbow"> submit </button>
        </form>
         </div>

    <div id="menu">
        <ul className="containerMenu">
        <li><a href="#"><div id={this.state.genreSelected === true ? ['c-selected'] : ['icon-top'] } className="icon-chrome1"></div> <div className="title-top">Category</div></a>
            <ul>
                <li><a href="#" onClick={this.onChangeGenre.bind(this, 27)}><div id="icon" className="icon-pie1"></div> <div className="title">Animals</div></a></li>
                <li><a href="#" onClick={this.onChangeGenre.bind(this, 21)}><div id="icon" className="icon-pie2"></div> <div className="title">Sports</div></a></li>
                <li><a href="#" onClick={this.onChangeGenre.bind(this, '')}><div id="icon" className="icon-pie3"></div> <div className="title">Random</div></a></li>
            </ul>
        </li>

        <li><a href="#"><div id={this.state.difficultySelected === true ? ['c-selected'] : ['icon-top'] } className="icon-chrome2"></div> <div className="title-top">Difficulty</div></a>
            <ul>
                <li><a href="#" onClick={this.onChangeDifficulty.bind(this, 'easy')}><div id="icon" className="icon-pie5"></div> <div className="title">Easy</div></a></li>
                <li><a href="#" onClick={this.onChangeDifficulty.bind(this, 'medium')}><div id="icon" className="icon-pie5"></div> <div className="title">Medium</div></a></li>
                <li><a href="#" onClick={this.onChangeDifficulty.bind(this, 'hard')}><div id="icon" className="icon-pie5"></div> <div className="title">Hard</div></a></li>
            </ul>
        </li>

        <li><a href="#"><div id={this.state.roundsSelected === true ? ['c-selected'] : ['icon-top'] } className="icon-chrome3"></div> <div className="title-top">Rounds</div></a>
            <ul>
                <li><a href="#" onClick={this.onChangeRounds.bind(this, '5')}><div id="icon" className="icon-pie7"></div> <div className="title">5 Rnds</div></a></li>
                <li><a href="#" onClick={this.onChangeRounds.bind(this, '10')}><div id="icon" className="icon-pie8"></div> <div className="title">10 Rnds</div></a></li>
                <li><a href="#" onClick={this.onChangeRounds.bind(this, '50')}><div id="icon" className="icon-pie9"></div> <div className="title">Unlimited</div></a></li>
            </ul>
        </li>
    </ul>
</div>
</div>

{/* //start card  */}

<div className={this.state.hover ? "hide" : "startbox"}> </div>

<div className="button_container">
<Link
to={
    {
        pathname: "/game",
        state: {
            playerName: this.state.playerName,
            difficulty: this.state.difficulty,
            genre: this.state.genre,
            genreID: this.state.genreID,
            rounds: this.state.rounds
          }
    }
}
className={this.state.difficultySelected  && this.state.playerPicked && this.state.roundsSelected ? 'btn' : 'hide' }
><span>Enter Game {this.state.playerName} </span>
</Link>
</div>
</div>

        );
    }
}

export default SelectionBox









