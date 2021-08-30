export const validateInput = (born, setValid) => {
  const year = {min: born.year[born.year.length - 1], max: born.year[0]};
  const month = {min: born.month[0], max: born.month[born.month.length - 1]};
  const day = {min: born.day[0], max: born.day[born.day.length - 1]};

  return (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    } else if (!/^[a-zA-Z\-|а-яA-Я\-]+$/i.test(values.name)) {
      errors.name = 'Invalid name';
    }

    if (!values.surname) {
      errors.surname = 'Required';
    } else if (!/^[a-zA-Z\-|а-яA-Я\-]+$/i.test(values.surname)) {
      errors.surname = 'Invalid surname';
    }

    if (!values.year) {
      errors.year = 'Required';
    } else if (!(values.year <= year.max && year.min >= values.year)) {
      errors.year = 'Invalid year';
    }

    if (!values.month) {
      errors.month = 'Required';
    } else if (!(values.month >= month.min && month.max <= values.month)) {
      errors.month = 'Invalid month';
    }

    if (!values.day) {
      errors.day = 'Required';
    } else if (!(values.day >= day.min && day.max <= values.day)) {
      errors.day = 'Invalid day';
    }

    if (!values.phone) {
      errors.phone = 'Required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(values.phone)) {
      errors.phone = 'Invalid phone';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    setValid(Object.keys(errors));
    return errors;
  }
}