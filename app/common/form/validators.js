// required field validator
export const required = value => (value ? false : true);

// email validator
export const email = value =>
  value && !/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/i.test(value)
    ? true
    : false;

// password min length
export const password = value => value.length >= 6 ? false : true;