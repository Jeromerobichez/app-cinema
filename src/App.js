import logo from './logo.svg';
import Form from './form'
import { Helmet } from 'react-helmet'
import './App.css';
import { useState } from 'react'
const axios = require('axios');


function App() {
 
  return (
   
    <div className="App">
       <Helmet>
          <title>Ze Ciné App</title>
        </Helmet>

      <div className="App-div">

       <h1>Welcome on ze ciné App :</h1>
  
<Form />
</div>
    </div>
  );
}

export default App;
