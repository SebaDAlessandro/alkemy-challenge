import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Lista = () => {


    const navigate = useNavigate()

    const logout = ()=>{
        localStorage.clear()
        navigate('/')
        MySwal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Usted ha salido del sitio!',
            confirmButtonText: "Ok",
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token === null){
            navigate('/')
        }
    }, []);

  return (
    <>
        <h2>Lista</h2>
        <button onClick={logout}>logout</button>
    </>
  )
}

export default Lista