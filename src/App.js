import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai, { COLOR_MODEL } from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'ec91620cabdf4e1180fb5e088fe46332'
 });

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


class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {},
      route:'signin',
      isSignedIn: false
    }
  }

  calcuateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;//grabing the first bounding box 
    //dom manipulation
    const image = document.getElementById('inputImage');
    //remember bounding box is the percentage of this image 
    const width = Number(image.width)//to make sure that its a number
    const height = Number(image.height)
    console.log(width,height);

    return{
      //letcol is the percentage of the width 
      leftCol: clarifaiFace.left_col * width,
      topRow:clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width), //is the total percentage - the width from the left hand side 
      bottomRow: height - (clarifaiFace.bottom_row * height) 

      //return a box here ,which will fill the job, here we will first need to figure out the fist second third and fourth dot sourrounding the box and then just wrap it in an order 
    }

  }
  //this is going to recieve a return value 
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box:box});
  } 


  //depending on the reion we get arrays, so if we have multiple people then we'll get multiple arrays 

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl:this.state.input})
      app.models
        .predict(
          Clarifai.FACE_DETECT_MODEL,
          this.state.input)
          //calculates inner function and displays facebox 
        .then(response => this.displayFaceBox(this.calcuateFaceLocation(response))) //this will get the response which is the bounding box, but this response will be recieved what we console log last time 
        .catch(err => console.log(err));
        // do something with response
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  }

  onRouteChange = (route) =>{
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    }else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:route})
  }

  render(){
    const { isSignedIn, imageUrl, route, box} = this.state;
  return (
    <div className="App">
      <Particles className = 'particles'
              params={paticlesOptions}
              style={{
                width: '100%',
                //backgroundImage: `url(${logo})` 
              }}
            />
      <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route === 'home'
          ? <div>
              
              <Logo />
              <Rank/>
              <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit ={this.onButtonSubmit} /> 
              <FaceRecognition box = {this.state.box} imageUrl={imageUrl}/>  
            </div>
          
          : (
            this.state.route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/> 
            : <Register onRouteChange={this.onRouteChange}/>
            )
       
      }
  </div>
  )
  }
}

export default App;
