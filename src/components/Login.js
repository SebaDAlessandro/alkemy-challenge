import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const Login = () => {


    const submitHandler = (e)=>{
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

        if(email === '' || password === ''){
            MySwal.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'Por favor complete los campos',
                confirmButtonText: "Ok",
            })
            return
        }

        if(email !== '' && !regexEmail.test(email)){
            MySwal.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'Debes escribir una dirección de correo válida',
                confirmButtonText: "Ok",
            })
            return
        }

        if(email !== 'challenge@alkemy.org' || password !== 'react'){
            MySwal.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'Credenciales inválidas',
                confirmButtonText: "Ok",
            })
            return
        }

        axios
            .post('http://challenge-react.alkemy.org',{ email, password })
            .then(res=>{
                MySwal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Ingreso exitoso!',
                    confirmButtonText: "Ok",
                })
                const token = res.data.token
                localStorage.setItem('token', token)/*localStorage.setItem = recibe dos propiedades(es un objeto... por lo tanto,
                    key y value): el nombre con el que se va a guardar y el valor del mismo
                    Importante: con localStorage.getItem('key') obtengo el value de esa llavae
                    para vaciarlo: localStorage.clear() -> sino queda guardado for ever! 
                    */

            })        
    }

  return (
    <>
        <h2>Formulario de login</h2>
        <form onSubmit={submitHandler}>
            <label>
                <span>Correo electrónico:</span> <br />
                <input 
                type='text'
                name='email'
                />
            </label>
            <br />
            <label>
                <span>Contraseña:</span> <br />
                <input
                type='password'
                name='password'
                />
            </label>
            <br />
            <button type="submit">Ingresar</button>
        </form>
    </>
  )
}

export default Login