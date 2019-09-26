import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank'
import './App.css';

const app = new Clarifai.App({
  apiKey: 'f2d8c6a20f994c9e9d8365c40f06a51e'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {input: '', imageUrl: '', box: {}, route: 'signin', isSignedIn: false}
  }

  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  handleChange = e => {
    this.setState({input: e.target.value})
  }

  handleSubmit = e => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  handleRouteChange = route => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { imageUrl, box, isSignedIn, route} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
            params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} handleRouteChange={this.handleRouteChange} />
        {route === 'home'
         ? <>
            <Logo />
            <Rank />
            <ImageLinkForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
           </>
         : (
           route === 'signin'
           ? <SignIn handleRouteChange={this.handleRouteChange}/>
           : <Register handleRouteChange={this.handleRouteChange}/>
         )
        }
      </div>
    );
  }
}

export default App;
