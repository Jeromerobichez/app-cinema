
import react, {useState, useEffect} from 'react';
import axios from 'axios'
import Modal from './modal';
const Results = ({data, firstActor, secondActor, firstPic, secondPic, showModal }) => {
  const [message, setMessage] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePitch, setMoviePitch] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [activeOverlay, setActiveOverlay] = useState(false);

const getMovieId = (e) => {
  e.preventDefault()
  movieInfoDisplay()

}
  const movieInfoDisplay = (id) => {
  
    axios 
      .post('https://app-cinema.osc-fr1.scalingo.io/movie-detail', {id}) //  http://localhost:5000/movie-detail
      .then(res => {
       
       setMovieTitle(res.data.title)
       setMoviePitch(res.data.overview)
       setMoviePoster(res.data.poster_path)
       setModalDisplayed(true)
       setActiveOverlay(true)

  
      })
      .catch(e => {
        setMessage(`Erreur lors de la création : ${e.message}`)
        console.log(message)
      })
  }
const closeModal = () => {
  setActiveOverlay(false)
  setModalDisplayed(false)
}
    return (
      data === "no data for actor1" ?
      <div className="unknown-div"> Sorry we can't find any actor under the name <span className="unknown-actor">{firstActor}</span>  </div> :
      data === "no data for actor2" ?
      <div className="unknown-div"> Sorry we can't find any actor under the name  <span className="unknown-actor">{secondActor} </span> </div> :
      data === "no common movie" ? 
      <div className="sorry-div">
        <div>Unfortunately {firstActor}  and {secondActor} never appeared together in a movie</div>
       
        <div className="photo-div">
        <img className="actor-pics"
            src={`https://image.tmdb.org/t/p/w500/${firstPic}`}
            width={150}/>
           <img className="actor-pics"
            src={`https://image.tmdb.org/t/p/w500/${secondPic}`}
            width={150}/>
            </div>
       </div>:
      data.length !== 0 ?
        <div>
         
         {data.length > 1 ?
        
        <h3>{firstActor} and {secondActor} appareared in <span className="movie-number"> {data.length} films</span> together</h3> 
         : 
         <h3>{firstActor} and {secondActor} appareared in <span className="movie-number"> {data.length} film</span> together</h3>}
       {/* <Modal isShowing={modalDisplayed ? true : false}/> */}
       <div className={activeOverlay ? 'overlay-active': "overlay-inactive"}
        onClick={closeModal}> </div>
       <div className= "modal-detail"
         style={{display: modalDisplayed ?  "flex" : "none"}}>
           <h3>{movieTitle}</h3>
           <img src={`https://image.tmdb.org/t/p/w500/${moviePoster}`}
           className="modal-poster"
            />
           <h4>Summary :</h4>
           <p>{moviePitch}</p>
            </div> 
        <div className="photo-div">
           <img className="actor-pics"
            src={`https://image.tmdb.org/t/p/w500/${firstPic}`}
            width={150}/>
           <img className="actor-pics"
            src={`https://image.tmdb.org/t/p/w500/${secondPic}`}
            width={150}/>
        </div>
      {data.map((e, i)=><div className="movie-title">
        <span className="movie-numero">n° {i+1}</span>
        <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
        width={100}
        onClick={() => movieInfoDisplay(e.id)}/>
        <div className="movie-infos">
       
        <h4 className="h4-title"
        onClick={() => movieInfoDisplay(e.id)}>{e.title} 
       
        </h4> 
        <p className="movie-date">release date of the movie : {e.release_date} </p>
        </div>
        </div> )
       }  
    
        
        </div>
        : 

 
          <div className="no-input">The list will appear here</div> 
    )
}

export default Results;
