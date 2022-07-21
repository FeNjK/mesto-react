import React from "react";
import Header from "./Header.js";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

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
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });

  // Используем стейт для данных из Api
  useEffect(() => {
    // Запрос к Api за информацией о пользователе
    // и массиве карточек выполняется единожды, при монторивании
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с получением пользовательских данных ${err}`
        );
      });

    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с получением массива карточек ${err}`);
      });
  }, []);
  // а вот если бы мы не поставили пустой массив последним
  // то вызоб совершался далеко не единожды */

  // Функции взаимодействия с карточками
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с лайком карточки ${err}`);
      });
  }

  // Сделано по аналогии с функцией лайка карточки
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с удалением карточки ${err}`);
      });
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с обновлением пользовательских данных ${err}`
        );
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api
      .setUserAvatar(userAvatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с обновлением аватара пользователя ${err}`
        );
      });
  }

  function handleAddPlace(placeData) {
    api
      .addNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => {
        console.log(
          `Тут какая-то ошибка с добавлением новой карточки ${err}`
        );
      });
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

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />

      {/* Заготовка реализации функций удаления карточек и лайка будет осуществлена в 11 спринте */}
      {/* <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonText="Да"
      /> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
