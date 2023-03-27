import React, { useState } from "react";

import AuthForm from "./AuthForm.js";

function Register ({onSubmit}) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      vocation:vocation
    })
  }

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      subtitle="Уже зарегистрированы?"
      link="Войти"
      onSubmit={onSubmit}
      email={email}
      handleChangeEmail={handleChangeEmail}
      password={password}
      handleChangePassword={handleChangePassword}
      submitButtonText="Зарегистрироваться"
    />
  )
}

export default Register;
