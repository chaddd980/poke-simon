import React, { Component } from 'react';
import './App.min.css';
import squirt from '../squirt.mp3';
import bulb from '../bulb.mp3';
import char from '../char.mp3';
import pika from './pikachu.mp3';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-div">
          <Pokemon className="squirt" audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798282/007Squirtle_XY_anime_jdl1ze.png"} sound={squirt} />
          <div className="filler"></div>
          <div className="middle-pokemon">
            <Pokemon audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798266/001Bulbasaur_Dream_rsskjs.png"} sound={bulb} />
            <Pokemon audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798273/004Charmander_OS_anime_rotmth.png"} sound={char} />
          </div>
          <div className="filler"></div>
          <Pokemon className="pika" audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798367/025Pikachu_XY_anime_3_zvg897.png"} sound={pika} />
        </div>
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

class Pokemon extends Component {

  playCry() {
    this.props.audio.src = this.props.sound
    this.props.audio.play()
  }

  render() {
    return (
      <div className="pokemon">
        <div onClick={() => this.playCry()}><img className="pic" src={this.props.pokemon} alt="pic of pokemon"/></div>
      </div>
    )
  }
}



export default App;
