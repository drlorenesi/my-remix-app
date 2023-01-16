import { useState } from 'react';
import { Link, NavLink } from '@remix-run/react';
import { FaHome } from 'react-icons/fa';
// Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = () => setMenuOpen(false);

  return (
    <>
      <Navbar
        bg='light'
        expand='sm'
        sticky='top'
        className='shadow-sm rounded mb-2'
      >
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <FaHome />
          </Navbar.Brand>
          <Navbar.Toggle onClick={toggleMenu} />
          <Navbar.Offcanvas
            placement='end'
            show={menuOpen ? 1 : 0}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <hr />
              {/* Left side Nav */}
              {/* -------------- */}
              <Nav className='me-auto'>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link
                    as={NavLink}
                    to='posts'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Posts
                  </Nav.Link>
                </Nav>
              </Nav>
              {/* Right side Nav */}
              {/* ------------- */}
              <Nav>
                <NavDropdown
                  align='end'
                  title='Options'
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to='/a'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to='/b'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to='/c'
                    onClick={menuOpen ? toggleMenu : null}
                  >
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}
