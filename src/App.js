import React, { Component } from 'react';
import './App.min.css';
import squirt from '../squirt.mp3';
import bulb from '../bulb.mp3';
import char from '../char.mp3';
import pika from './pikachu.mp3';
import error from '../error.wav'

class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    on: false,
    score: 0,
    name: "off",
    count: 0,
    strict: false,
    strictName: "notStrict off",
    pokemon: ["squirt", "char", "pika", "bulb"],
    pokemonAudio: [{squirt}, {char}, {pika}, {bulb}],
    audio: new Audio(),
    randomSound: [],
    keys: [],
    previousCry: false,
    soundOn: false,
    soundCount: 0,
    userSelectionCount: [],
    userChoices: [],
    errorClass: "hidden",
    win: false

  }
}
  handleClick() {
    if(this.state.on === false) {
      this.addPokemon()
    } else {
      this.setState({on: false, name: "off", randomSound: [], score: 0, errorClass: "hidden", keys: []});
    }
  }

  addPokemon() {
    if (this.state.win === false) {
      var randomPokemon = this.state.pokemonAudio[Math.floor(Math.random()*this.state.pokemonAudio.length)]
      var key = Object.keys(randomPokemon)[0]
      var sound = randomPokemon[key]
      var arrayvar = this.state.randomSound.slice()
      var keyValues = this.state.keys.slice()
      arrayvar.push(sound)
      keyValues.push(key)
      this.setState({
        on: true, name: "on", randomSound: arrayvar, keys: keyValues
      }, () => {
        this.randomCry()
      });
    }
  }

  addPokemonSelection() {
    var self = this
    var score = this.state.score
    var userSelectionCount = this.state.userSelectionCount
    userSelectionCount.push("pokemon")
    this.setState({
      userSelectionCount: userSelectionCount
    })
    if(this.state.userSelectionCount.length === this.state.randomSound.length) {
      this.resetUserSelectionCount()
      this.resetCount()
      this.setState({
        score: score + 1
      }, () => {
        this.winnerCheck()
      })
      setTimeout(function(){
        self.addPokemon()
      }, 2000)
    }
  }

  winnerCheck() {
    var self = this
    setTimeout(function() {
      if(self.state.score === 2) {
        self.setState({win: true, on: false, name: "off", randomSound: [], score: 0, errorClass: "hidden", keys: []}, () => {alert("YOU WIN!!!")})
      }
    }, 1000)
  }

  resetUserSelectionCount() {
    this.setState({
      userSelectionCount: []
    })
  }

  randomCry() {
    var self = this
    for (let i = 0; i < this.state.randomSound.length; i++) {
      if (this.state.soundOn) {
        setTimeout(function() {
          self.cry(i)
        }, 1300*i)
      } else {
        this.cry(i)
        this.setState({
          soundOn: true
        })
      }
    }
  }

  cry(i) {
    var audio = this.state.audio
    var self = this
    var randomPokemon = self.state.randomSound[i]
    audio.src = randomPokemon
    audio.play()
  }

  addToUserChoices(poke) {
    var choices = this.state.userChoices
    choices.push(poke)
    this.setState({
      userChoices: choices
    })
  }

  removeFromUserChoices() {
    var choices = this.state.userChoices
    choices.pop()
    this.setState({
      userChoices: choices
    })
  }

  removeAllUserChoices() {
    this.setState({
      userChoices: []
    })
  }

  addErrorMessage() {
    this.setState({
      errorClass: "visible"
    })
  }

  removeErrorMessage() {
    this.setState({
      errorClass: "hidden"
    })
  }

  addCount() {
    var count = this.state.count
    this.setState({
      count: count + 1
    })
  }

  resetCount() {
    this.setState({
      count: 0
    })
  }

  handleClickStrict() {
    if(this.state.strict === false) {
      this.setState({strict: true, strictName: "strict on switch"});
    } else {
      this.setState({strict: false, strictName: "notStrict off switch"});
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Controls name={this.state.name} handleClick={() => this.handleClick()} handleClickStrict={() => this.handleClickStrict()} strict={this.state.strictName} />
        <Pokeball removeErrorMessage={this.removeErrorMessage.bind(this)} addErrorMessage={this.addErrorMessage.bind(this)} removeFromUserChoices={this.removeFromUserChoices.bind(this)} removeAllUserChoices={this.removeAllUserChoices.bind(this)} addToUserChoices={this.addToUserChoices.bind(this)} score={this.state.score} count={this.state.count} addCount={this.addCount.bind(this)} addPokemonSelection={this.addPokemonSelection.bind(this)} pokemonOrder={this.state.keys} on={this.state.on} randomSound={this.state.randomSound}/>
        <div className={this.state.errorClass}>That was not the correct pokemon! Try that selection again.</div>
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>Poke-Simon Game</h1>
      </div>
    )
  }
}

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="controlHeader">Strict Mode</div>
        <Switch name={this.props.strict} handleClick={this.props.handleClickStrict}/>
        <div className="controlHeader">Play Game</div>
        <Switch name={this.props.name} handleClick={this.props.handleClick}/>
      </div>
    )
  }
}

class Switch extends Component {
	render() {
		return (
      <div className="onOff"><p>ON</p>
  			<div className={this.props.name}>
          <div onClick={this.props.handleClick} className="Button"></div>
  			</div><p>OFF</p>
      </div>
		)
	}
}

class Pokeball extends Component {
  constructor(props) {
  super(props)
  this.state = {
    current: "",
    pokemon: ["squirt", "char", "pika", "bulb"],
    audio: new Audio(),
    userChoices: [],
    count: 0
  }
}
  render() {
    return (
      <div className="pokeball">
        <Pokemon removeErrorMessage={this.props.removeErrorMessage} addErrorMessage={this.props.addErrorMessage} addCount={this.props.addCount} count={this.props.count} removeAllUserChoices={this.props.removeAllUserChoices} removeFromUserChoices={this.props.removeFromUserChoices} addToUserChoices={this.props.addToUserChoices} userChoices={this.state.userChoices} addPokemonSelection={this.props.addPokemonSelection} pokemonOrder={this.props.pokemonOrder} name={this.state.pokemon[0]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798282/007Squirtle_XY_anime_jdl1ze.png" audio={this.state.audio} sound={squirt}  />
        <div className="filler"></div>
        <div className="middle-pokemon">
          <Pokemon removeErrorMessage={this.props.removeErrorMessage} addErrorMessage={this.props.addErrorMessage} addCount={this.props.addCount} count={this.props.count} removeAllUserChoices={this.props.removeAllUserChoices} removeFromUserChoices={this.props.removeFromUserChoices} addToUserChoices={this.props.addToUserChoices} userChoices={this.state.userChoices} addPokemonSelection={this.props.addPokemonSelection} pokemonOrder={this.props.pokemonOrder} name={this.state.pokemon[3]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798266/001Bulbasaur_Dream_rsskjs.png" audio={this.state.audio} sound={bulb} />
          <div className="count">{this.props.score}</div>
          <Pokemon removeErrorMessage={this.props.removeErrorMessage} addErrorMessage={this.props.addErrorMessage} addCount={this.props.addCount} count={this.props.count} removeAllUserChoices={this.props.removeAllUserChoices} removeFromUserChoices={this.props.removeFromUserChoices} addToUserChoices={this.props.addToUserChoices} userChoices={this.state.userChoices} addPokemonSelection={this.props.addPokemonSelection} pokemonOrder={this.props.pokemonOrder} name={this.state.pokemon[1]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798273/004Charmander_OS_anime_rotmth.png" audio={this.state.audio} sound={char} />
        </div>
        <div className="filler"></div>
        <Pokemon removeErrorMessage={this.props.removeErrorMessage} addErrorMessage={this.props.addErrorMessage} addCount={this.props.addCount} count={this.props.count} removeAllUserChoices={this.props.removeAllUserChoices} removeFromUserChoices={this.props.removeFromUserChoices} addToUserChoices={this.props.addToUserChoices} userChoices={this.state.userChoices} addPokemonSelection={this.props.addPokemonSelection} pokemonOrder={this.props.pokemonOrder} name={this.state.pokemon[2]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798367/025Pikachu_XY_anime_3_zvg897.png" audio={this.state.audio} sound={pika} />
      </div>
    )
  }
}

class Pokemon extends Component {
  constructor(props) {
  super(props)
  this.state = {
    class: this.props.name + " pokemon " + this.props.current,
  }
}

  playCry() {
    this.props.audio.src = this.props.sound
    this.props.audio.play()
  }

  playError() {
    this.props.audio.src = error
    this.props.audio.play()
  }

  handleClick() {
    if(this.props.userChoices < this.props.pokemonOrder && this.props.pokemonOrder[this.props.count] === this.props.name) {
      this.props.removeErrorMessage()
      this.playCry()
      this.props.addToUserChoices(this.props.name)
      this.props.addCount()
      this.props.addPokemonSelection()
    } else if(this.props.userChoices < this.props.pokemonOrder && this.props.pokemonOrder[this.props.count] !== this.props.name) {
      this.props.addErrorMessage()
      this.playError()
    }
  }

  render() {
    return (
      <div className={this.state.class}>
        <div onClick={() => this.handleClick()}><img className="pic" src={this.props.pokemon} alt="pic of pokemon"/></div>
      </div>
    )
  }
}

export default App;
