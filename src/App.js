import './App.css';
import Navigation from './components/navigation/Navigation';
import Clarifai from 'clarifai';
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForme/ImageLinkForm';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import { Component} from 'react';

const app = new Clarifai.App({
  apiKey: '94b1c1da6e1c40aba8c704a4ef816f25'
 });

const particleOption = {
  
    particles: {
      number: {
        value : 90,
        density: {
          enable : true,
          value_area: 800
        }
      }
    }
  }

class App extends Component {
  constructor(){
    super();
  this.state = {
    input : '',
    imageUrl : '',
    box : {},
    route : 'signin',
    isSignIn : false
  }
}
  calculateFaceLocation = (data) =>{
   const clarifaiface =  data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
   console.log(width, height);
   return {
     leftCol : clarifaiface.left_col * width,
     topRow : clarifaiface.top_row * height,
     rightCol : width - (clarifaiface.right_col * width),
     bottomRow : height - (clarifaiface.bottom_row * height)

   }
  }
  onRouteSignin = (route) =>{
    if (route === 'signout') {
      this.setState({isSignIn : false})
    }else if (route === 'home') {
      this.setState({isSignIn : true})
    }
    this.setState({route : route})
  }

  displayFaceBox = (box) =>{
    this.setState({box : box});
  }

  onInputChange = (event) =>{
    this.setState({input : event.target.value})
  }


  onButtonSubmit = () =>{
    this.setState({imageUrl : this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    //
  }

  render(){
    const {route, box, imageUrl, isSignIn} = this.state;
    return (
    
      <div className="App">
             <Particles className = "particles"
                params={particleOption}
              />
        <Navigation isSignIn = {isSignIn} onRouteSignin = {this.onRouteSignin}/>

          { this.state.route === 'home'

            ? 
              <div>
                <Logo/>
                <Rank/> 
                <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
                <Facerecognition box = {box} imageUrl = {imageUrl} />
              </div>
            :
            (
              route === 'signin' ? <Signin onRouteSignin = {this.onRouteSignin} /> : <Register onRouteSignin = {this.onRouteSignin} />
            )
          }
      </div>
    )
  }
 ;
}

export default App;
