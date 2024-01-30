import { Component } from 'react';
import ContactList from './ContactsList/ContactsList';
import ContactListForm from './ContactsListForm/ContactsListForm';

import styles from './my-contacts.module.css';
import { nanoid } from 'nanoid';

class MyContacts extends Component {
  state = {
    contacts: [],
    nane: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
    }
  }

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const normalizednumber = number.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const normalizedCurrentNumber = item.number.toLowerCase();
      return (
        normalizedCurrentName === normalizedName ||
        normalizedCurrentNumber === normalizednumber
      );
    });
    return Boolean(dublicate);
  }

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(`${data.name} is already in contacts`);
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);
      return { contacts: newContacts };
    });
  };

  changeFilter = target => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return normalizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  }

  render() {
    const { addContact, deleteContact, changeFilter } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.container}>
        <ContactListForm onSubmit={addContact} />
        <div className={styles.filterContainer}>
          <label>Find contacts by name</label>
          <input
            className={styles.filterInput}
            onChange={e => changeFilter(e.target)}
            name="filter"
            placeholder="Search"
          />
          <ContactList items={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}

export default MyContacts;
