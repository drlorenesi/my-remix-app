import { redirect } from '@remix-run/node';
import {
  Link,
  Form as RemixForm,
  useLoaderData,
  useTransition,
} from '@remix-run/react';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Models
import { getPost, deletePost } from '~/models/posts.server.js';

export const loader = async ({ params }) => {
  const post = await getPost(params.postId);

  if (post === undefined)
    throw new Response('El recurso que buscas no existe.', {
      status: 404,
    });

  return post;
};

export const action = async ({ params, request }) => {
  const form = await request.formData();
  if (form.get('intent') !== 'delete') {
    throw new Response(`La acción '${form.get('intent')}' no es válida`, {
      status: 400,
    });
  }

  const post = await getPost(params.postId);
  if (!post) {
    throw new Response('El recurso a eliminar no existe.', {
      status: 404,
    });
  }
  await deletePost(params.postId);

  return redirect('/posts');
  // return {};
};

export default function Post() {
  const post = useLoaderData();
  const { state } = useTransition();
  let isSubmitting = state === 'submitting' || state === 'loading';

  return (
    <>
      <div className='page-header'>
        <h2>Post {post.id}</h2>
        <Button as={Link} to='/posts' variant='outline-primary'>
          Back
        </Button>
      </div>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <p>
            <b>Title:</b> {post.title}
          </p>
          <p>
            <b>Body:</b> {post.body}
          </p>
          <hr />
          {/* Delete Button */}
          <RemixForm method='post'>
            <Button
              name='intent'
              type='submit'
              value='delete'
              variant='danger'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </Button>
          </RemixForm>
        </Col>
      </Row>
    </>
  );
}
