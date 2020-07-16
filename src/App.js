import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const paticlesOptions = {
  particles: {
    number:{
      value: 70,
      density:{
        enable: true,
        value_area: 500
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles className = 'particles'
              params={paticlesOptions}
              style={{
                width: '100%',
                //backgroundImage: `url(${logo})` 
              }}
            />
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm /> 
    </div>
  )
  }


export default App;
