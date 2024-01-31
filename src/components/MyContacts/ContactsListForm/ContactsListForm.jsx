import { useState } from 'react';
import { nanoid } from 'nanoid';

import styles from './contacts-list-form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const ContactListForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...INITIAL_STATE });
  };

  const phonebookNameId = nanoid();
  const phonebookNumberId = nanoid();

  const { name, number } = state;

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formContainer}>
          <label htmlFor={phonebookNameId}>Name</label>
          <input
            value={name}
            required
            name="name"
            onChange={handleChange}
            className={styles.phonebookInput}
            id={phonebookNameId}
            placeholder="Enter a name"
          />
        </div>
        <div className={styles.formContainer}>
          <label htmlFor={phonebookNumberId}>Number</label>
          <input
            type="tel"
            value={number}
            required
            name="number"
            onChange={handleChange}
            className={styles.phonebookInput}
            id={phonebookNumberId}
            placeholder="Enter the number"
          />
        </div>
        <button className={styles.phonebookButton} type="submit">
          Add contact
        </button>
      </form>
      <h2>Contacts</h2>
    </>
  );
};

export default ContactListForm;
