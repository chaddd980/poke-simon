import React, { Component } from 'react';
import './App.min.css';
import squirt from '../squirt.mp3';
import bulb from '../bulb.mp3';
import char from '../char.mp3';
import pika from './pikachu.mp3';

class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    on: false,
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
    soundCount: 0

  }
}


  handleClick() {
    if(this.state.on === false) {
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
    } else {
      this.setState({on: false, name: "off"});
    }
  }


  // randomCry() {
  //   let audio = this.state.audio
  //   let array = this.state.randomSound.map(function(x) {
  //     audio.src = x
  //     audio.play()
  //   })
  // }

  randomCry() {
    var self = this
    for (let i = 0; i < this.state.randomSound.length; i++) {
      if (this.state.soundOn) {
        setTimeout(function() {
          self.cry(i)
        }, 1500*i)
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
        <Pokeball on={this.state.on} randomSound={this.state.randomSound} count={this.state.count}/>
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
  }
}

  render() {
    return (
      <div className="pokeball">
        <Pokemon name={this.state.pokemon[0]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798282/007Squirtle_XY_anime_jdl1ze.png" audio={this.state.audio} sound={squirt}  />
        <div className="filler"></div>
        <div className="middle-pokemon">
          <Pokemon name={this.state.pokemon[3]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798266/001Bulbasaur_Dream_rsskjs.png" audio={this.state.audio} sound={bulb} />
          <div className="count">{this.props.count}</div>
          <Pokemon name={this.state.pokemon[1]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798273/004Charmander_OS_anime_rotmth.png" audio={this.state.audio} sound={char} />
        </div>
        <div className="filler"></div>
        <Pokemon name={this.state.pokemon[2]} current={this.state.current} pokemon="http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798367/025Pikachu_XY_anime_3_zvg897.png" audio={this.state.audio} sound={pika} />
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

  render() {
    return (
      <div className={this.state.class}>
        <div onClick={() => this.playCry()}><img className="pic" src={this.props.pokemon} alt="pic of pokemon"/></div>
      </div>
    )
  }
}

export default App;
