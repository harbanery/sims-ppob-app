export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email diperlukan";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email tidak valid";
  }

  if (!values.password) {
    errors.password = "Password diperlukan";
  } else if (values.password.length < 8) {
    errors.password = "Password harus memiliki panjang 8 karakter atau lebih";
  }

  return errors;
};

export const validateRegister = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email diperlukan";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email tidak valid";
  }

  if (!values.first_name) {
    errors.first_name = "Nama depan diperlukan";
  } else {
    if (/\d/.test(values.first_name)) {
      errors.first_name = "Nama depan tidak boleh memiliki angka";
    } else if (/[!@#$%^&*(),?":{}|<>+_-]/.test(values.first_name)) {
      errors.first_name = "Nama depan tidak boleh memiliki karakter khusus";
    } else if (!/[A-Z]/.test(values.first_name)) {
      errors.first_name = "Nama depan harus memiliki minimal 1 huruf besar";
    }
  }

  if (!values.last_name) {
    errors.last_name = "Nama belakang diperlukan";
  } else {
    if (/\d/.test(values.last_name)) {
      errors.last_name = "Nama belakang tidak boleh memiliki angka";
    } else if (/[!@#$%^&*()?":{}|<>+_-]/.test(values.last_name)) {
      errors.last_name = "Nama belakang tidak boleh memiliki karakter khusus";
    } else if (!/[A-Z]/.test(values.last_name)) {
      errors.last_name = "Nama belakang harus memiliki minimal 1 huruf besar";
    }
  }

  if (!values.password) {
    errors.password = "Password diperlukan";
  } else if (values.password.length < 8) {
    errors.password = "Password harus memiliki panjang 8 karakter atau lebih";
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Konfirmasi password diperlukan";
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = "Konfirmasi password harus sama dengan password";
  }

  return errors;
};

export const validateProfile = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "Nama depan diperlukan";
  } else {
    if (/\d/.test(values.first_name)) {
      errors.first_name = "Nama depan tidak boleh memiliki angka";
    } else if (/[!@#$%^&*(),?":{}|<>+_-]/.test(values.first_name)) {
      errors.first_name = "Nama depan tidak boleh memiliki karakter khusus";
    } else if (!/[A-Z]/.test(values.first_name)) {
      errors.first_name = "Nama depan harus memiliki minimal 1 huruf besar";
    }
  }

  if (!values.last_name) {
    errors.last_name = "Nama belakang diperlukan";
  } else {
    if (/\d/.test(values.last_name)) {
      errors.last_name = "Nama belakang tidak boleh memiliki angka";
    } else if (/[!@#$%^&*()?":{}|<>+_-]/.test(values.last_name)) {
      errors.last_name = "Nama belakang tidak boleh memiliki karakter khusus";
    } else if (!/[A-Z]/.test(values.last_name)) {
      errors.last_name = "Nama belakang harus memiliki minimal 1 huruf besar";
    }
  }

  return errors;
};

export const validateTopUp = (value) => {
  let error = "";
  let value_int = 0;

  if (!value) {
    error = "Harga Top Up diperlukan";
  } else if (!/[0-9]/.test(value)) {
    error = "Harga Top Up hanya untuk angka saja";
  } else {
    value_int = parseInt(value, 10);
    if (value_int < 0) {
      error = "Harga Top Up kurang dari nol";
    } else if (value_int < 10000) {
      error = "Harga Top Up kurang dari minimum";
    } else if (value_int > 1000000) {
      error = "Harga Top Up lebih dari maksimum";
    }
  }

  return { value: value_int, error };
};
