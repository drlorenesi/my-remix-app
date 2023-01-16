// Bootstrap
import Container from 'react-bootstrap/Container';
// Components
import Navigation from '~/components/Navigation';
import Footer from '~/components/Footer';

export default function Layout({ children }) {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navigation />
      <Container className='flex-shrink-0 mb-3' fluid>
        {children}
      </Container>
      <footer className='mt-auto py-3 bg-light'>
        <Footer />
      </footer>
    </div>
  );
}
