import {
  Link,
  useActionData,
  useTransition,
  Form as RemixForm,
} from '@remix-run/react';
// import { redirect } from '@remix-run/node';
import * as Yup from 'yup';
// Bootstrap
import Form from 'react-bootstrap/Form';
// import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
// Models
// import { addPost } from '~/models/posts.server.js';
// Utils
import validate from '~/utils/validate.server';

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^.+?(?:deltafrio.com|gmail.com)$/,
      'Por favor usa tu correo de "@deltafrio.com"'
    )
    .required('Campo obligatorio.'),
});

export const action = async ({ request }) => {
  const formData = await request.formData();
  const result = await validate(formData, validationSchema);
  // If there are 'fieldErrors', return 'result'
  if (result?.status === 400) return result;
  // Get field data
  const { email } = result.fields;
  console.log({ email });
  return null;
};

export default function Login() {
  const actionData = useActionData();
  const transition = useTransition();
  let isSubmitting =
    transition.state === 'submitting' || transition.state === 'loading';

  return (
    <>
      <div className='login-form'>
        <h2 className='text-center p-2'>¿Olvidaste tu contraseña?</h2>
        <p className='text-center text-muted'>
          Por favor ingresa el correo electrónico que usaste para crear tu
          cuenta.
        </p>
        <Form as={RemixForm} noValidate method='post'>
          {/* Email */}
          <Form.Group className='mb-3'>
            <Form.Control
              type='email'
              name='email'
              placeholder='Email'
              defaultValue={actionData?.fields?.email}
              isInvalid={!!actionData?.fieldErrors?.email}
            />
            <Form.Text className='text-muted'>
              Tu correo "@example.com"
            </Form.Text>
            <div className='text-danger'>
              <small>{actionData?.fieldErrors?.email}</small>
            </div>
          </Form.Group>
          <div className='d-grid'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Solicitando reinicio...' : 'Solicitar reinicio'}
            </Button>
          </div>
        </Form>
      </div>
      {/* Link para inicio de sesión */}
      <p className='text-center'>
        ¿Ya tienes cuenta? <Link to='/login'>Inicia sesión aquí.</Link>
      </p>
    </>
  );
}
