import React from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  // Создали переменную состояния и эффект при монтировании,
  // который будет вызывать api.getUserInfo 
  // и обновлять стейт переменную из полученного значения
  /**
   * currentUser - переменная состояния
   * setCurrentUser - эфффект при монтировании
   */
  const [currentUser, setCurrentUser] = React.useState({});

  // Функции взаимодействия с карточками
  
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    
  }

  // Функции взаимодействия с попапами
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        cards={cards}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        onClose={closeAllPopups}
        onEditProfile={handleEditProfileClick}
        name="edit"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={`${isEditProfilePopupOpen ? "popup_activ" : ""}`}
      >
        <fieldset className="popup__input-place" name="popup__input-place">
          <input
            type="text"
            name="profile_name"
            placeholder="Введите ваше имя"
            className="popup__input popup__input_content_name"
            id="profile_name"
            minLength="2"
            maxLength="40"
            required
          />
          <span
            className="popup__validation-message popup__validation-message_position_first"
            id="profile_name-error"
          ></span>
          <input
            type="text"
            name="type_of_activity"
            placeholder="Укажите род ваших занятий"
            className="popup__input popup__input_content_activity-type"
            id="type_of_activity"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className="popup__validation-message popup__validation-message_position_second"
            id="type_of_activity-error"
          ></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceClick}
        name="add-new-card"
        title="Новое место"
        buttonText="Сохранить"
        isOpen={`${isAddPlacePopupOpen ? "popup_activ" : ""}`}
      >
        <fieldset className="popup__input-place" name="popup__input-place">
          <input
            type="text"
            name="card-title"
            placeholder="Название"
            className="popup__input popup__input_content_image-title"
            id="card-title"
            minLength="2"
            maxLength="30"
            required
          />
          <span
            className="popup__validation-message popup__validation-message_position_first"
            id="card-title-error"
          ></span>
          <input
            type="url"
            name="picture-link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_content_image-link"
            id="picture-link"
            required
          />
          <span
            className="popup__validation-message popup__validation-message_position_second"
            id="picture-link-error"
          ></span>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        onEditProfile={handleEditAvatarClick}
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={`${isEditAvatarPopupOpen ? "popup_activ" : ""}`}
      >
        <fieldset className="popup__input-place" name="popup__input-place">
          <input
            type="url"
            name="profile-avatar"
            placeholder="Введите адрес изображения"
            className="popup__input popup__input_content_avatar"
            id="profile-avatar"
            required
          />
          <span
            className="popup__validation-message popup__validation-message_position_first"
            id="profile-avatar-error"
          ></span>
        </fieldset>
      </PopupWithForm>

      {/* Реализация функций удаления карточек и лайка будет осуществлена в 11 спринте */}
      {/* <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonText="Да"
      >

      </PopupWithForm> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
