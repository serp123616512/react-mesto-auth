import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import AcceptDeleteCardPopup from "./AcceptDeleteCardPopup.js";

import { api } from "../utils/api.js";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isAcceptDeleteCardPopupOpen, setAcceptDeleteCardPopupOpen] = React.useState('');

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleTrashClick(cardId) {
    setAcceptDeleteCardPopupOpen(cardId);
  }

  function handleSubmitEditAvatarPopup({avatar}) {
    api
    .patchUserAvatar({avatar})
    .then(user => {
      setCurrentUser(user);
    })
    .catch(console.log);
  }

  function handleUpdateUser({name, vocation}) {
    api
    .patchUserInfo({name, vocation})
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(console.log);
  }

  function handleSubmitAddPlacePopup() {

  }

  function handleSubmitAcceptDeleteCardPopup() {

  }

  function handleCardLike(cardId) {
    api
    .putLike(cardId)
    .then(newCard => {
      setCards(cards => cards.map(card => card._id === cardId ? newCard : card));
    })
    .catch(console.log);
  }

  function handleCardDislike(cardId) {
    api
    .deleteLike(cardId)
    .then(newCard => {
      setCards(cards => cards.map(card => card._id === cardId ? newCard : card));
    })
    .catch(console.log);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setAcceptDeleteCardPopupOpen('');
  }

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getCardData()])
    .then(([userData, cardData]) => {
      setCurrentUser(userData);
      setCards(cardData);
    })
    .catch(console.log);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={handleAvatarClick}
        onEditProfile={handleProfileClick}
        onAddPlace={handleAddCardClick}
        cards={cards}
        onCardClick={handleCardClick}
        onTrashClick={handleTrashClick}
        onCardLike={handleCardLike}
        onCardDislike={handleCardDislike}
      />
      <Footer />
      {/*  Popups  */}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmitEditAvatarPopup}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmitAddPlacePopup}
      />
      <AcceptDeleteCardPopup
        isOpen={isAcceptDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmitAcceptDeleteCardPopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
