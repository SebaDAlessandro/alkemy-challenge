import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './favoritos.css'


const Favoritos = ({ addOrRemoveFrontFavs, favorites }) => {

  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    !token && navigate('/')
  }, [token, navigate]);

  return (
    <section className='favoritos__container'>
        <h1>Sección de Favoritos</h1>
        {favorites.length === 0 && <h3>Usted no ha elegido ninguna película todavía.</h3>}
        <div className={!token ? 'noFavoritos' : 'listaFavoritos__container'}>
        {favorites.map((movie, index)=>{
        return(
          <>
          <div className='lista__card' key={index} >
            <img src={movie.imgURL} className={movie.imgURL? 'card__img':'card__img-none'} alt='img' id='imagen'/>
            {!movie.imgURL && <p>Not image yet</p>}
            <button
              onClick={ addOrRemoveFrontFavs }
              className='card__favorite-btn'
              data-movie-id = {movie.id}
              >
                <span class="material-symbols-outlined">favorite</span>
            </button>
            <div className='card__body'>
              <h5 className='card__title'>{movie.title}</h5>
              <p className='card__text'>{movie.overview.substring(0,100)}...</p>
              <Link to={`/detalle/${movie.id}`} className='btn btn-primary'>View detail</Link>
            </div>
          </div>
          </>
        )
      })
      }
    </div>
    </section>
  )
}

export default Favoritos