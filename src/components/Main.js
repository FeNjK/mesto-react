import editingPen from '../images/editing-pen.svg';
import buttonVector from '../images/button-vector.svg';

function Main() {
  return (
    <main className="content">

      <section className="profile">
        <article className="profile-info">
          <img className="profile-info__avatar"
               src="#"
               alt="Аватар пользователя"/>
          <button className="profile-info__avatar-button"
                  title="Редактирование аватара"
                  aria-label="Кнопка редактирование аватара">
            <img className="profile-info__avatar-pen"
                 src={editingPen}
                 alt="Перо редактирования аватара пользователя"/>
          </button>
          
          <div className="profile-info__data">
            <div className="profile-info__single-level">
              <h1 className="profile-info__name">Жак-Ив Кусто</h1>
              <button className="profile-info__editing-button"
                   title="Редактирование профиля"
                   type="button"
                   aria-label="Кнопка редактирование профиля">
                <img className="profile-info__editing-pen"
                     src={editingPen}
                     alt="Перо редактирования имени и рода деятельности"/>
              </button>
            </div>
            <p className="profile-info__activity-type">Исследователь океана</p>
          </div>
        </article>
        <button className="profile__add-button"
                type="button" 
                title="Добавить фотографии">
          <img className="profile__button-vector"
               src={buttonVector}
               alt="Добавить фотографии"/>
        </button>
      </section>

      <section className="photo-library">
        <ul className="elements">
          
        </ul>
      </section>

    </main>
  )
}

export default Main;