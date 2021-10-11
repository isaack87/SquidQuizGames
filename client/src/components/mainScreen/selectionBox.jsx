import React from 'react'


class SelectionBox extends React.Component {
    constructor (props) {
        super (props)
        this.state = {
            playerName: "",
            difficulty: "",
            genre: "",
            choice: "Pick a Selection",
            difficultySelected: false,
            genreSelected: false,
            playerPicked: false
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
            this.setState({
                genre: e,
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
            <a href="#" onClick={this.onChangeGenre.bind(this, 'Arts')}>Arts</a>
            <a href="#" onClick={this.onChangeGenre.bind(this, 'Sports')}>Sports</a>
            <a href="#" onClick={this.onChangeGenre.bind(this, 'History')}>History</a>
            </div>
            <div className={this.state.difficultySelected === true ? 'show' : 'hide' }>You have Selected genre {this.state.genre} </div>
        </div>

       
        <div className="dropdown">
            <button className="dropbtn">{this.state.choice} {this.state.difficulty}</button>
            <div className="dropdown-content">
            <a href="#" onClick={this.onChangeDifficulty.bind(this, 'Easy')}>Easy</a>
            <a href="#" onClick={this.onChangeDifficulty.bind(this, 'Medium')}>Medium</a>
            <a href="#" onClick={this.onChangeDifficulty.bind(this, 'Hard')}>Hard</a>
            </div>
            <div className={this.state.genreSelected === true ? 'show' : 'hide' }>You have Selected {this.state.difficulty} difficulty</div>
        </div>

        <button className={this.state.difficultySelected && this.state.genreSelected && this.state.playerPicked ? 'top-spacing' : 'hide' }>Click to Enter Game {this.state.playerName} </button>
        </div>
        );
    }
}

export default SelectionBox
