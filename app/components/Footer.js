import Container from 'react-bootstrap/Container';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <span className='text-muted'>
        <small>&copy; {new Date().getFullYear()} REMIX App</small>
      </span>
      <br />
      <a
        style={{ color: '#777' }}
        href='https://github.com/drlorenesi/my-remix-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        <FaGithub />
      </a>{' '}
      <span className='text-muted'>
        <small>v0.0.1</small>
      </span>
    </Container>
  );
}
