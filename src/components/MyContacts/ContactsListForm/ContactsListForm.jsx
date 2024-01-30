import { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './contacts-list-form.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactListForm extends Component {
  phonebookNameId = nanoid();
  phonebookNumberId = nanoid();

  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { phonebookNameId, phonebookNumberId, handleSubmit, handleChange } =
      this;
    const { name, number } = this.state;
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
  }
}

export default ContactListForm;
