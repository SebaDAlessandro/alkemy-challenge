import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'
import { Button, Form } from 'react-bootstrap';

const MySwal = withReactContent(Swal)

const Header = () => {

  const navigate = useNavigate()

  const logout = ()=>{
    sessionStorage.clear()
    navigate('/')
    MySwal.fire({
        title: 'Success',
        icon: 'success',
        text: 'Usted ha salido del sitio!',
        confirmButtonText: "Ok",
    })
  }

  const submitHandler = e =>{
    e.preventDefault()
    const value = e.currentTarget.search.value.trim()

    if(value.length === 0){
      MySwal.fire({
        title: 'Oops...',
        icon: 'error',
        text: 'What are you looking for?',
        confirmButtonText: "Ok",
    })
    }else if(value.length < 3){
      MySwal.fire({
        title: 'Oops...',
        icon: 'error',
        text: 'Write more than two letters',
        confirmButtonText: "Ok",
    })
    }else {
      e.currentTarget.search.value = ''
      navigate(`/resultados/${value}`)
    }
  }


  return (
    <header className='header__container'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Alkemy Movies SPA</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='nav__link' to='/'>Home</NavLink>
              <NavLink className='nav__link' to='/lista'>Lista</NavLink>
              <NavLink className='nav__link' to='/contacto'>Contacto</NavLink>
            </Nav>
            <Nav>
              <Nav.Link className='logout'><span onClick={logout}>logout</span></Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form className="d-flex" onSubmit={submitHandler}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name='search'
              />
              <Button variant="outline-success" type='submit'>Search</Button>
           </Form>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header