import { useState, useEffect } from 'react';
import ContactList from './ContactsList/ContactsList';
import ContactListForm from './ContactsListForm/ContactsListForm';

import styles from './my-contacts.module.css';
import { nanoid } from 'nanoid';

const MyContacts = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('my-contacts'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name, number }) => {
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
  };

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} is already in contacts`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };

      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = event => setFilter(event.target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return normalizedName.includes(normalizedFilter);
    });
    return filteredContacts;
  };

  const items = getFilteredContacts();

  return (
    <div className={styles.container}>
      <ContactListForm onSubmit={addContact} />
      <div className={styles.filterContainer}>
        <label>Find contacts by name</label>
        <input
          className={styles.filterInput}
          onChange={changeFilter}
          name="filter"
          placeholder="Search"
        />
        <ContactList items={items} deleteContact={deleteContact} />
      </div>
    </div>
  );
};

export default MyContacts;
