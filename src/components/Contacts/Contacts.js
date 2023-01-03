import css from './Contacts.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

const Contacts = ({ data, handleDelete }) => {
  return (
    <div className={css.contacts}>
      <ul className={css.list}>
        {data.map(contact => {
          return (
            <li
              onClick={handleDelete}
              className={css.li}
              id={nanoid()}
              key={nanoid()}
            >
              <div>
                <span className={css.name}>{contact.name}</span>
                <span className={css.number}>{contact.number}</span>
              </div>

              <button type="button" className={css.delete}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default Contacts;
