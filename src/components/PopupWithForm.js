function PopupWithForm({ isOpen, onClose, name, title, children, buttonText }) {
  // Создадим функцию для отмены перезагрузки страницы при сабмите
  function onSubmitHandler(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`popup popup_animation popup_task_${name} ${
        isOpen && "popup_activ"
      }`}
    >
      <div className="popup__content">
        <button
          className={`popup__close-button popup__close-button_window_${name}`}
          type="button"
          title="Закрыть окно"
          onClick={onClose}
        />
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmitHandler}
          noValidate
          autoComplete="off"
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__save-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
