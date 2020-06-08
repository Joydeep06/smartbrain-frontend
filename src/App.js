import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/navigation';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import Imagelinkform from './components/imagelinkform/imagelinkform';
import Rank from './components/rank/rank';
import Facerecognition from './components/facerecognition/facerecognition';
import './App.css';

const paramOption={
  particles: {
    number:{
      value: 150,
      density:{
        enable: true,
        value_area: 1200
      }
    }
  }
}


 const initialState={
  input:'',
      imageUrl:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user:{
            id:'',
            name:'',
            email:'',
            entries: 0,
            joined: ''
      }
 }
 
class App extends Component{
  constructor(){
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }


  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol:width-(clarifaiFace.right_col * width),
      bottomRow:height-(clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box: box})
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onPictureSubmit=()=>{
    this.setState({imageUrl: this.state.input})
    fetch('https://immense-eyrie-43963.herokuapp.com/imageURL',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
          input:this.state.input
       })
    })
      .then(response=>response.json())
      .then(response=> {
        if(response){
          fetch('https://immense-eyrie-43963.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                id:this.state.user.id
          })
        })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(err=>console.log(err));
      }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err=>console.log(err));
    }

    onRouteChange=(route)=>{
      if(route=== 'home'){
        this.setState({isSignedIn: true});
      }
      else if(route=== 'signout'){
        this.setState(initialState);
      }
      this.setState({route: route})
    }

  render(){
    const {isSignedIn, imageUrl, route, box}=this.state;
    return(
      <div className='App'>
        <Particles className='particles' 
          params={paramOption}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
            route==='home'
          ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <Imagelinkform 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit}
            />
            <Facerecognition box={box} imageUrl={imageUrl}/>
          </div>
          :
          (
            route==='signin'
            ?
            <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
    </div>
    );
  }
}
export default App;