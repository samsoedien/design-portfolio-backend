const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateContactInput(data) {
  const errors = {};

  data = {
    name: !isEmpty(data.name) ? data.name : '',
    email: !isEmpty(data.email) ? data.email : '',
    subject: !isEmpty(data.subject) ? data.subject : '',
    message: !isEmpty(data.message) ? data.message : '',
  };

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = 'Message field is required';
  }

  if (!Validator.isLength(data.name, { min: 2, max: 64 })) {
    errors.name = 'Name must be between 2 and 64 characters';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.subject, { max: 128 })) {
    errors.subject = 'Subject cannot be longer than 128 characters';
  }

  if (!Validator.isLength(data.message, { min: 24, max: 10000 })) {
    errors.message = 'A written message must be atleast 24 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
