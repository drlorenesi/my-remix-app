import {
  Link,
  useActionData,
  useTransition,
  Form as RemixForm,
} from '@remix-run/react';
import { redirect } from '@remix-run/node';
import * as Yup from 'yup';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// Models
import { addPost } from '~/models/posts.server.js';
// Utils
import validate from '~/utils/validate.server';

// Yup validation Schema
const validationSchema = Yup.object({
  title: Yup.string()
    .min(2, 'The title must be over 2 characters')
    .max(5, 'The title cannot be over 5 characters')
    .nullable(),
  body: Yup.string()
    .min(2, 'The body must be over 2 characters')
    .max(20, 'The body cant be over 20 characters')
    .nullable(),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await validate(formData, validationSchema);
  // If there are 'fieldErrors', return 'result'
  if (result?.status === 400) return result;
  // Add post to DB
  const { title, body } = result.fields;
  await addPost(title, body);
  return redirect('/posts');
  // Alternative redirect
  // const { rows } = await addPost(title, body);
  // return redirect(`/posts/${rows.insertId}`);
};

export default function NewPost() {
  const actionData = useActionData();
  const transition = useTransition();
  console.log(!!transition.submission);
  let isSubmitting =
    transition.state === 'submitting' || transition.state === 'loading';

  return (
    <>
      <div className='page-header'>
        <h2>New Post</h2>
        <Button as={Link} to='/posts' variant='outline-primary'>
          Back
        </Button>
      </div>

      <Row>
        <Col lg={6} md={6} sm={6}>
          <Form as={RemixForm} method='POST'>
            <Form.Group className='mb-3'>
              {/* Title */}
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='Your title...'
                defaultValue={actionData?.fields?.title}
                isInvalid={!!actionData?.fieldErrors?.title}
              />
              <div className='text-danger'>
                <small>{actionData?.fieldErrors?.title}</small>
              </div>
            </Form.Group>
            {/* Body */}
            <Form.Group className='mb-3'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as='textarea'
                name='body'
                placeholder='Write something...'
                defaultValue={actionData?.fields?.body}
                isInvalid={!!actionData?.fieldErrors?.body}
              />
              <div className='text-danger'>
                <small>{actionData?.fieldErrors?.body}</small>
              </div>
            </Form.Group>
            {/* <Button type='submit'>Add Post</Button> */}
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Add Post'}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
