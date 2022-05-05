import react, {useState, useEffect} from 'react';
import './form.css';
import Results from './Results'
import axios from 'axios'

function Form  ()  {
    const [nameFirstActor, setNameFirstActor] = useState('');
    const [nameSecondActor, setNameSecondActor] = useState('');
    const [message, setMessage] = useState(null);
    const [resultats, setResultats] = useState([]);
    const [firstActorPic, setFirstActorPic] = useState('');
    const [secondActorPic, setSecondActorPic] = useState('');
    const [firstActorName, setFirstActorName] = useState('');
    const [secondActorName, setSecondActorName] = useState('');


      let data = {nameFirstActor, nameSecondActor };

      let resultsTitles = []

     /*  const options = {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json' 
          },
      } */

 const submitForm = e => {
    e.preventDefault()
    axios
      /* .post('https://app-cinema.osc-fr1.scalingo.io/api', data)  */
      .post('http://localhost:5000/api', data) 
      .then(res => {
       setResultats(res.data.results)
       setFirstActorPic(res.data.firstPic)
       setSecondActorPic(res.data.secondPic)
       setFirstActorName(res.data.nameActorOne)
       setSecondActorName(res.data.nameActorTwo)
       console.log("res.data res.data res.data",res.data)
     
      /* .then(res => {
        setFirstActorPic(res.data.firstPics)
      }) */
       
        
      })
      .catch(e => {
        setMessage(`Erreur lors de la création : ${e.message}`)
        console.log(message)
      })
     
  }



    return (
     
    <div className='form-div'>
       <div >
        <h3>This app is designed to give you the list of all the movies in which two actors appear together </h3>
        
          <div className='input-card'>
       <h3> Please Enter the two actors you want to search : </h3>
        <div>
        <div className='input-div'>
            <form className='input-form'>
              <div className='input-label-div'>
            <label className='input-label'> the first actor : 
            <input type="text" id="id-input" name="actor-input-1" className='actor-input'
             placeholder="first actor"
            
             onChange={(e) => setNameFirstActor(e.target.value)}/> 
            
            </label>
            </div>
            <br/>
            <div  className='input-label-div'>
            <label className='input-label'> the second actor : 
            <input type="text" id="id-input" name="actor-input-2" className='actor-input'
           placeholder="second actor"
            onChange={(e) => setNameSecondActor(e.target.value)}/>
            </label>
            </div>
            <div className='input-submit-div'>
              <label>
                <input type="submit"
                id="submit-input"
                className={nameFirstActor != '' && nameSecondActor!= '' ? 'submit-button' : 'non-active-button'}
                onClick={submitForm}
                value="Submit your two actors" />
                 
              </label>
            </div>
            </form>
            </div>

        </div> 
       
        </div>
        </div>
  <Results data={resultats}
   firstActor={nameFirstActor}
    secondActor={nameSecondActor} 
    firstPic={firstActorPic}
    secondPic={secondActorPic}
    firstActorName={firstActorName} 
    secondActorName={secondActorName}/> 
    </div>
   
    )
}

export default Form;
