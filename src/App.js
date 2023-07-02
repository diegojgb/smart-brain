import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './containers/Signin/Signin';
import Register from './containers/Register/Register';
import ParticlesBg from 'particles-bg';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

const App = () => {
  // constructor() {
  //   super();
  //   this.state = {
  //     input: '',
  //     imageUrl: '',
  //     box: {},
  //     route: 'signin',
  //     isSignedIn: false,
  //     user: {
  //       id: '',
  //       name: '',
  //       email: '',
  //       entries: 0,
  //       joined: '',
  //     }
  //   }
  // }

  const resetState = () => {
    setInput('');
    setImageUrl('');
    setBox({})
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    });
  }

  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(
    {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    })

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const calculateFaceLocation = (data) => {
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

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onButtonSubmit = (event) => {
    setImageUrl(input);

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ input: input })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      if (result) {
        fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: user.id })
        })
        .then(response => response.json())
        .then(count => {
          setUser({                   
                ...user,
                entries: count
              })
        })
        .catch(console.log)
      }
      setBox(calculateFaceLocation(result));
    })
    .catch(error => console.log('error', error));
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
      resetState();
      route = 'register';
    } else if (route === 'home') {
      setIsSignedIn(true);
    }

    setRoute(route);
  }

  return (
    <div className="App">
      <ParticlesBg type="tadpole" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      { route === 'signin'
        ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
        : route === 'register'
        ? <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        : <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
      }
    </div>
  );
}

export default App;
