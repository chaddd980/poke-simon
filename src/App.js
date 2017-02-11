import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import squirt from '../squirt.mp3';
import bulb from '../bulb.mp3';
import char from '../char.mp3';
import pika from './pikachu.mp3';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pokemon audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798282/007Squirtle_XY_anime_jdl1ze.png"} sound={squirt} />
        <Pokemon audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798266/001Bulbasaur_Dream_rsskjs.png"} sound={bulb} />
        <Pokemon audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798273/004Charmander_OS_anime_rotmth.png"} sound={char} />
        <Pokemon audio={new Audio()} pokemon={"http://res.cloudinary.com/dk5ge9sgn/image/upload/v1486798367/025Pikachu_XY_anime_3_zvg897.png"} sound={pika} />
      </div>
    );
  }
}

class Pokemon extends Component {

  playCry() {
    this.props.audio.src = this.props.sound
    this.props.audio.play()
  }

  render() {
    return (
      <div className="footer">
        <div onClick={() => this.playCry()}><img className="pic" src={this.props.pokemon}/></div>
      </div>
    )
  }
}

export default App;
