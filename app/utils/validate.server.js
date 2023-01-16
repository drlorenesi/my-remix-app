import { badRequest } from './request.server';

// Get field values and convert JSON object
const getValues = (formData) => {
  const formJSON = {};
  for (var key of formData.keys()) {
    formJSON[key] = formData.get(key);
  }
  return formJSON;
};

// Get field errors from validation schema
const getFieldErrors = (err) => {
  const fieldErrors = {};
  err.inner.forEach((error) => {
    if (error.path) {
      fieldErrors[error.path] = error.message;
    }
  });
  return fieldErrors;
};

export default async function validate(formData, validationSchema) {
  let fields = getValues(formData);
  try {
    await validationSchema.validate(fields, { abortEarly: false });
    return { fields, fieldErrors: null, formError: null };
  } catch (error) {
    const fieldErrors = getFieldErrors(error);
    return badRequest({
      fields,
      fieldErrors,
      formError: 'Form not submitted correctly.',
    });
  }
}
