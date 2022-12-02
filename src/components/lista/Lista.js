import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './lista.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


const Lista = () => {
  const [movies, setMovies] = useState([]);
  const token = sessionStorage.getItem('token')
  const navigate = useNavigate()


  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=es-ES&page=1'
    axios.get(endPoint)
    .then((res)=>{
      setMovies(res.data.results)
    })
    .catch(err =>{
      MySwal.fire({
        title: 'error',
        icon: 'error',
        text: err,
        confirmButtonText: "Ok",
      })
    })
    !token && navigate('/')
  }, [setMovies, navigate, token]);

  return (
    <>
    <div className={!token ? 'noLista' : 'lista__container'}>
      {movies.map((movie, index)=>{
        return(
          <div className='lista__card' key={index} >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} className={movie.backdrop_path ? 'card__img':'card__img-none'} alt='img' />
            {!movie.backdrop_path && <p>Not image yet</p>}
            <div className='card__body'>
              <h5 className='card__title'>{movie.title}</h5>
              <p className='card__text'>{movie.overview.substring(0,100)}...</p>
              <Link to={`/detalle/${movie.id}`} className='btn btn-primary'>View detail</Link>
            </div>
          </div>
        )
      })}

    </div>
    </>
  )
}

export default Lista