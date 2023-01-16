// Remix
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useCatch,
} from '@remix-run/react';
// Styles
import globalStylesUrl from 'bootstrap/dist/css/bootstrap.min.css';
import additionalStyles from '~/styles/index.css';
// Bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export const meta = () => ({
  charset: 'utf-8',
  title: 'Remix App',
  viewport: 'width=device-width,initial-scale=1',
  keywords: 'remix, react, javascript',
  description: 'A cool blog built with Remix',
});

export const links = () => [
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: additionalStyles },
];

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Alert variant='danger'>
          <Alert.Heading>The following error ocurred:</Alert.Heading>
          <ul>
            <li>
              <samp style={{ fontSize: 14 }}>{error.message}</samp>
            </li>
          </ul>
        </Alert>
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const navigate = useNavigate();

  return (
    <Document>
      <div
        style={{
          textAlign: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Alert variant='warning'>
          <Alert.Heading>
            Status: <samp>{caught.status}</samp>
          </Alert.Heading>
          <samp style={{ fontSize: 14 }}>
            {JSON.stringify(caught.data, null, 2)}
          </samp>
        </Alert>
        <Button
          variant='primary'
          onClick={() => navigate('/', { replace: true })}
          className='mb-2'
        >
          Regresar a Inicio
        </Button>{' '}
        <Button
          variant='outline-primary'
          onClick={() => navigate(-1, { replace: false })}
          className='mb-2'
        >
          a Página Anterior
        </Button>
      </div>
    </Document>
  );
}
