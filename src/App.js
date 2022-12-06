//components
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Lista from './components/lista/Lista'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Detalle from "./components/detalle/Detalle";
import Resultados from "./components/resultados/Resultados";
import Favoritos from "./components/favoritos/Favoritos";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEffect, useState } from "react";

//styles
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const MySwal = withReactContent(Swal)


function App() {

  const [ favorites, setFavorites ] = useState([])
   
  const addOrRemoveFrontFavs = (e)=>{


    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const id = btn.dataset.movieId
    const movieData = {imgURL, title, overview, id}
    const favMovies = localStorage.getItem('favs')
    let tempMovieInFavs;
  
    if(favMovies === null){
      tempMovieInFavs = []
    }else{
      tempMovieInFavs = JSON.parse(favMovies)
    }

    let movieIsInArray = tempMovieInFavs.find(oneMovie =>{
      return oneMovie.id === movieData.id
    })

    if(!movieIsInArray){
      tempMovieInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMovieInFavs))
      setFavorites(tempMovieInFavs);
      MySwal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Se ha agregado a favoritos!',
        confirmButtonText: "Ok",
      })
    }else{
      MySwal.fire({
        title: 'Are you sure?',
        text: "Desea quitar esta película de favoritos?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remove!'
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire(
            'Removed!',
            'Se ha quitado la película.',
            'success'
            )
            let movieLeft = tempMovieInFavs.filter(oneMovie =>{
              return oneMovie.id !== movieData.id
            })
            localStorage.setItem('favs', JSON.stringify(movieLeft))
            setFavorites(movieLeft);
        }
      })
    }
  }

  useEffect(()=>{
    const favsInLocal = localStorage.getItem('favs')
    if(favsInLocal !== null) {
        const favsArray = JSON.parse(favsInLocal)
        setFavorites(favsArray);
    }
  },[])

  return (
    <>
    <Header favorites={favorites}/>
    <Routes className='container mt-3'>
      <Route path="*" element={<Login />} />
      <Route path='/' element={<Login />} />
      <Route path='/lista' element={<Lista addOrRemoveFrontFavs = {addOrRemoveFrontFavs} />} />
      <Route path='/detalle/:id' element={<Detalle addOrRemoveFrontFavs = {addOrRemoveFrontFavs}/>} />
      <Route path='/resultados/:keyword' element={<Resultados addOrRemoveFrontFavs = {addOrRemoveFrontFavs}/>} />
      <Route path='/favoritos' element={<Favoritos addOrRemoveFrontFavs = {addOrRemoveFrontFavs} favorites={favorites}/>} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
