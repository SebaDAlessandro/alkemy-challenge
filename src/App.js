//components
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Lista from './components/lista/Lista'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Detalle from "./components/detalle/Detalle";
import Resultados from "./components/resultados/Resultados";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//styles
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const MySwal = withReactContent(Swal)


function App() {
  
  const addOrRemoveFrontFavs = (e)=>{
    const favMovies = localStorage.getItem('favs')
  
    let tempMovieInFavs;
  
    if(favMovies === null){
      tempMovieInFavs = []
    }else{
      tempMovieInFavs = JSON.parse(favMovies)
    }
    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const id = btn.dataset.movieId
    const movieData = {
      imgURL, title, overview, id
    }
    let movieIsInArray = tempMovieInFavs.find(oneMovie =>{
      return oneMovie.id === movieData.id
    })
    if(!movieIsInArray){
      tempMovieInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMovieInFavs))
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
          }
      })
    }
  }

  return (
    <>
    <Header />
    <Routes className='container mt-3'>
      <Route path="*" element={<Login />} />
      <Route path='/' element={<Login />} />
      <Route path='/lista' element={<Lista addOrRemoveFrontFavs = {addOrRemoveFrontFavs} />} />
      <Route path='/detalle/:id' element={<Detalle />} />
      <Route path='/resultados/:keyword' element={<Resultados />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
