import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imageLinkForme/ImageLinkForm';
import Facerecognition from './components/Facerecognition/Facerecognition';
import Register from './components/Register/Register';
import Signin from './components/Signin/Signin';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import { Component} from 'react';


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
const initialState = 
  {
    input : '',
    imageUrl : '',
    box : {},
    route : 'signin',
    isSignIn : false,
    user : {
      id : "",
      name : "",
      email :"",
      entries : 0,
      joined : ""
    }
  }

class App extends Component {
  constructor(){
    super();
  this.state = initialState
}
loadUser = (data) =>{
  this.setState({user : {
    id : data.id,
    name : data.name,
    email :data.email,
    entries : data.entries,
    joined : data.joined
  }})
    
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
      this.setState(initialState)
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
    fetch('http://localhost:3000/imageurl',{

      method : 'post',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({
        input : this.state.input
        })
    })
    .then(response => response.json())
    .then(response =>{ 

      if(response){
        fetch('http://localhost:3000/image',{

          method : 'put',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
               id : this.state.user.id
            })
        })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, {entries : count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
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
                <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
                <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit} />
                <Facerecognition box = {box} imageUrl = {imageUrl} />
              </div>
            :
            (
              route === 'signin' ? <Signin loadUser={this.loadUser} onRouteSignin = {this.onRouteSignin} /> : <Register loadUser = {this.loadUser}  onRouteSignin = {this.onRouteSignin} />
            )
          }
      </div>
    )
  }
 ;
}

export default App;
