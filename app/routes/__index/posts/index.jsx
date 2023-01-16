import { Link, useLoaderData } from '@remix-run/react';
// Bootstrap
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Models
import { getPosts } from '~/models/posts.server.js';

export const meta = () => ({
  title: 'Posts!',
});

export const loader = async () => {
  const posts = await getPosts();
  return posts;
};

export default function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <div className='page-header'>
        <h2>Posts</h2>
        <Button as={Link} to='/posts/new' variant='primary'>
          New Post
        </Button>
      </div>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <ListGroup>
            {posts.map((post) => (
              <ListGroup.Item
                key={post.id}
                action
                as={Link}
                to={`/posts/${post.id}`}
              >
                <div>
                  <div className='fw-bold'>{post.title}</div>
                  <small>{new Date(post.created_at).toLocaleString()}</small>
                  <br />
                  {post.body}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}
