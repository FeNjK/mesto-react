import { useEffect, useState } from "react";
import editingPen from "../images/editing-pen.svg";
import buttonVector from "../images/button-vector.svg";
import Card from "./Card.js";
import api from "../utils/Api.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [cards, setCards] = useState([]);

  // Используем стейт для данных из Api
  // (Хотя можно было все это перенести и в App.js...)
  useEffect(() => {
    // Запрос к Api за информацией о пользователе
    // и массиве карточек выполняется единожды, при монторивании
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(`Тут какая-то ошибка с получением пользовательских данных ${err}`);
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
  // то вызоб совершался далеко не единожды

  return (
    <main className="content">
      <section className="profile">
        <article className="profile-info">
          <img
            className="profile-info__avatar"
            src={userAvatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile-info__avatar-button"
            title="Редактирование аватара"
            onClick={onEditAvatar}
            aria-label="Кнопка редактирование аватара"
          >
            <img
              className="profile-info__avatar-pen"
              src={editingPen}
              alt="Перо редактирования аватара пользователя"
            />
          </button>

          <div className="profile-info__data">
            <div className="profile-info__single-level">
              <h1 className="profile-info__name">{userName}</h1>
              <button
                className="profile-info__editing-button"
                title="Редактирование профиля"
                onClick={onEditProfile}
                type="button"
                aria-label="Кнопка редактирование профиля"
              >
                <img
                  className="profile-info__editing-pen"
                  src={editingPen}
                  alt="Перо редактирования имени и рода деятельности"
                />
              </button>
            </div>
            <p className="profile-info__activity-type">{userDescription}</p>
          </div>
        </article>
        <button
          className="profile__add-button"
          type="button"
          title="Добавить фотографии"
          onClick={onAddPlace}
        >
          <img
            className="profile__button-vector"
            src={buttonVector}
            alt="Добавить фотографии"
          />
        </button>
      </section>

      {/* Из старого проекта скопировали разметку карточки, 
      находившуюся внутри тега template, и используйте её 
      внутри JSX-итерации по массиву cards */}

      <section className="photo-library">
        <ul className="elements">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                name={card.name}
                link={card.link}
                likes={card.likes}
                key={card._id}
                onCardClick={onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
