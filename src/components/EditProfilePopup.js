import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState();
  const [vocation, setVocation] = React.useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeVocation(e) {
    setVocation(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      vocation:vocation
    })
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setVocation(currentUser.about);
  }, [currentUser])

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={'Сохранить'}
    >
      <input
        id="name"
        className="popup__input-text"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span id="name-error" className="popup__input-error"></span>
      <input
        id="vocation"
        className="popup__input-text"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={vocation}
        onChange={handleChangeVocation}
      />
      <span id="vocation-error" className="popup__input-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
