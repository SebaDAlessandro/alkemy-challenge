import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './detalle.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


const Detalle = () => {

    const { id } = useParams()
    const [ movie, setMovie ] = useState(null)
    const navigate = useNavigate()
    const token = sessionStorage.getItem('token')

    useEffect(()=>{
        const endPoint = `https://api.themoviedb.org/3/movie/${id}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=es-ES`
        axios.get(endPoint)
        .then(res=>{
            setMovie(res.data)
        })
        .catch(err=>{
            MySwal.fire({
                title: 'error',
                icon: 'error',
                text: err,
                confirmButtonText: "Ok",
              })
              navigate('/lista')
        })
        !token && navigate('/')
    },[id, navigate, token])

    console.log(movie);

  return (

    <>
        {!movie && <p>Cargando...</p>}
        {movie &&         
        <div className='detalle__container'>
            <h1 className='title'>{movie.title}</h1>
            <div className='detalle__secciones'>
                <div className='img__container'>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} className={movie.backdrop_path ? 'img__featurs':'img__featurs-none'} alt='img'/>
                    {!movie.backdrop_path && <p>Not image yet</p>}
                </div>
                <div className='items__container'>
                    <h5 className='item__overview'>{ movie.overview }</h5>
                    <h5 className='item__key'>Fecha de esteno: <span className='item__value'>{ movie.release_date }</span></h5>
                    <h5 className='item__key'>Rating: <span className='item__value'>{ movie.vote_average }</span></h5>
                    <h5 className='item__key'>Generos:</h5>
                    <ul>
                        { movie.genres.map((oneGenre, index) => <li className='item__value' key={index}>{oneGenre.name}</li>) }
                    </ul> 
                    {movie.homepage && <a href={movie.homepage} className='item__value-link' target = '_blank' rel="noopener noreferrer">Ir a la Pagina Oficial</a>} 
                </div>
            </div>
        </div>
        }

    </>
  )
}

export default Detalle