import React  from "react";

function AuthForm({
  name,
  title,
  subtitle,
  link,
  onSubmit,
  email,
  handleChangeEmail,
  password,
  handleChangePassword,
  submitButtonText
  }) {
  return (
    <section id={name} className="auth">
      <form
        name={`${name}-form`}
        className="auth__content"
        onSubmit={onSubmit}
      >
        <h1 className="auth__title">{title}</h1>
        <input
          id={`${name}-email`}
          className="auth__input-text"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <span id={`${name}-email-error`} className="auth__input-error"></span>
        <input
          id={`${name}-password`}
          className="auth__input-text"
          type="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="30"
          required
          value={password}
          onChange={handleChangePassword}
        />
        <span id={`${name}-password-error`} className="auth__input-error"></span>
        <button className="auth__accept button-hover" type="submit">{submitButtonText}</button>
        <h2 className="auth__subtitle">
          {subtitle}
          <a className="auth__link button-hover" href="#">{link}</a>
        </h2>
      </form>
    </section>
  )
}

export default AuthForm;
