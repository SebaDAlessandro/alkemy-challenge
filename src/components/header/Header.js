import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css'

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
        </Container>
      </Navbar>
    </header>
  )
}

export default Header