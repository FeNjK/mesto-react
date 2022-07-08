import Header from './Header.js';
import Main from './Main';
import Footer from './Footer';
//import PopupWithForm from './PopupWithForm';
//import ImagePopup from './ImagePopup';
//import Api from '../utils/Api.js';

function App() {
  return (
    <>
    <Header />
    <Main />
    <Footer />
    
    <div className="popup popup_task_edit popup_animation">
      <div className="popup__content">
        <button className="popup__close-button popup__close-button_window_edit"
                type="button"
                title="Закрыть окно"></button>
        <form className="popup__form popup__form_type_user-data" 
              name="profile_data_editing_window"
              novalidate
              autocomplete="off">
          <h3 className="popup__title">Редактировать профиль</h3>
          <fieldset className="popup__input-place"
                    name="popup__input-place">
            <input type="text"
                   name="profile_name"
                   placeholder="Введите ваше имя"
                   className="popup__input popup__input_content_name"
                   id="profile_name"
                   minlength="2"
                   maxlength="40"
                   required/>
            <span className="popup__validation-message popup__validation-message_position_first"
                  id="profile_name-error">
            </span>
            <input type="text"
                   name="type_of_activity"
                   placeholder="Укажите род ваших занятий"
                   className="popup__input popup__input_content_activity-type"
                   id="type_of_activity"
                   minlength="2"
                   maxlength="200"
                   required/>
            <span className="popup__validation-message popup__validation-message_position_second"
                  id="type_of_activity-error">
            </span>
          </fieldset>
          <button className="popup__save-button"
                  type="submit">Сохранить</button>
        </form>
      </div>
    </div>
    
    <div className="popup popup_animation popup_task_add">
      <div className="popup__content">
        <button className="popup__close-button popup__close-button_window_add"
                type="button"
                title="Закрыть окно"></button>
        <form className="popup__form popup__form_type_new-card" 
              name="window_for_adding_cards"
              novalidate
              autocomplete="off">
          <h3 className="popup__title">Новое место</h3>
          <fieldset className="popup__input-place"
                    name="popup__input-place">
            <input type="text"
                   name="card-title"
                   placeholder="Название"
                   className="popup__input popup__input_content_image-title"
                   id="card-title"
                   minlength="2"
                   maxlength="30"
                   required/>
            <span className="popup__validation-message popup__validation-message_position_first"
                  id="card-title-error">
            </span>
            <input type="url"
                   name="picture-link"
                   placeholder="Ссылка на картинку"
                   className="popup__input popup__input_content_image-link"
                   id="picture-link"
                   required/>
            <span className="popup__validation-message popup__validation-message_position_second"
                  id="picture-link-error">
            </span>
          </fieldset>
          <button className="popup__save-button"
                  type="submit">Создать</button>
        </form>
      </div>
    </div>

    <div className="popup popup_animation popup_task_avatar">
      <div className="popup__content">
        <button className="popup__close-button popup__close-button_window_avatar"
                type="button"
                title="Закрыть окно"></button>
        <form className="popup__form popup__form_type_avatar"
              name="profile_avatar_editing_window"
              novalidate
              autocomplete="off">
          <h3 className="popup__title">Обновить аватар</h3>
          <fieldset className="popup__input-place"
                    name="popup__input-place">
            <input type="url"
                   name="profile-avatar"
                   placeholder="Введите адрес изображения"
                   className="popup__input popup__input_content_avatar"
                   id="profile-avatar"
                   required/>
            <span className="popup__validation-message popup__validation-message_position_first"
                  id="profile-avatar-error">
            </span>
          </fieldset>
          <button className="popup__save-button"
                  type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="popup popup_animation popup_task_show-image">
      <div className="popup__increase-content">
        <button className="popup__close-button popup__close-button_window_show-image"
                type="button"
                title="Закрыть окно"></button>
        <img className="popup__image"
             src="#"
             alt=""/>
        <p className="popup__caption"></p>
      </div>
    </div>

    <div className="popup popup_type_confirmation popup_animation">
      <div className="popup__content">
        <button className="popup__close-button popup__close-button_window_confirmation"
                type="button"
                title="Закрыть"></button>
        <form className="popup__form popup__form_type_confirmation" 
              name="confirmation_window">
          <h3 className="popup__title">Вы уверены?</h3>
          <button className="popup__save-button"
                  type="submit">Да</button>
        </form>
     </div>
    </div>

    <template className="template">
      <li className="element">
        <img className="element__image"
             src="#"
             alt=""></img>
        <h2 className="element__title"></h2>
        <div className="element__mark-block">
          <button className="element__mark" type="button"></button>
          <p className="element__mark-counter">0</p>
        </div>
        <button className="element__trash" type="button"></button>
      </li>
    </template>
  </>
  );
}

export default App;
