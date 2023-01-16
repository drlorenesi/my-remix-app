import { Outlet } from '@remix-run/react';
import SSRProvider from 'react-bootstrap/SSRProvider';
// Components
import Layout from '~/components/Layout';

export default function Index() {
  return (
    <>
      <SSRProvider>
        <Layout>
          <Outlet />
        </Layout>
      </SSRProvider>
    </>
  );
}
