//components
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Lista from './components/lista/Lista'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Detalle from "./components/detalle/Detalle";
import Resultados from "./components/resultados/Resultados";

//styles
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const favMovies = localStorage.getItem('favs')

  let tempMovieInFavs;

  if(favMovies === null){
    tempMovieInFavs = []
  }else{
    tempMovieInFavs = JSON.parse(favMovies)
  }

  const addOrRemoveFrontFavs = (e)=>{
    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const id = btn.dataset.movieId
    const movieData = {
      imgURL, title, overview, id
    }
    tempMovieInFavs.push(movieData)
    localStorage.setItem('favs', JSON.stringify(tempMovieInFavs))
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
