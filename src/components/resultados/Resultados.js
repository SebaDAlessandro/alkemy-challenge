import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './resultados.css'
import '../lista/lista.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const Resultados = ({ addOrRemoveFrontFavs }) => {
    const { keyword } = useParams('keyword')
    const token = sessionStorage.getItem('token')
    const [ moviesFound, setMoviesFound ] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=es-ES&page=1&include_adult=false&query=${keyword}`

        axios.get(endPoint)
        .then(res => {
            const movies = res.data
            setMoviesFound(movies.results)
        })
        .catch(err =>{
            MySwal.fire({
                title: 'error',
                icon: 'error',
                text: err,
                confirmButtonText: "Ok",
              })
              navigate('/lista')
        })
        !token && navigate('/')
    }, [keyword, navigate, token])

  return (
    <section className='resultados__container'>
        {moviesFound.length === 0 && <h3>No se encontraron peliculas bajo el titulo: {keyword}</h3>}
        <div className={!token ? 'noLista' : 'lista__container'}>
        {moviesFound.map((movie, index)=>{
            return(
            <div className='lista__card' key={index} >
                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} className={movie.backdrop_path ? 'card__img':'card__img-none'} alt='img' />
                {!movie.backdrop_path && <p>Not image yet</p>}
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
            )
        })}

    </div>
    </section>
  )
}

export default Resultados