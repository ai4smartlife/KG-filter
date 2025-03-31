const password = /^(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;

const phone_number = /^(\+84|84|0){1}([3|5|7|8|9]){1}([0-9]{8})$/;

const phone_country = /^(84|856|82|86){1}$/;

const positive_numbers = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/;

export const Pattern = {
  password,
  phone_number,
  phone_country,
  positive_numbers,
};
