import React, { Component } from 'react';
import css from './App.module.css';
import Formular from './Form/Form';
import Contacts from './Contacts/Contacts';
import Section from './Section/Section';
import Filter from './Filter/Filter'
import { nanoid } from 'nanoid';


const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: ''
};

class App extends Component {
  state = INITIAL_STATE;

  handleSubmit = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const number = event.target.number.value;

    const newContact = { id: nanoid(), name: name, number: number };

    if(this.state.contacts.find(contact => 

      contact.name.toLowerCase() === newContact.name.toLowerCase()
    )) {

      return alert(`${name} is already in contacts`)
      
    }

    else {
      this.setState(
      {
        contacts: [...this.state.contacts, ...[newContact]],
      },
      () => {
        event.target.name.value = '';
        event.target.number.value = '';
      }
    )}

  
  };

  handleDelete = event => {
    if (event.target.type === 'button') {
      const container = event.currentTarget.firstElementChild;

      const selectedContact = container.firstElementChild.textContent;

      console.log(selectedContact)
      const newContacts = [...this.state.contacts];
      newContacts.map(contact => {
        if (contact.name === selectedContact) {
          const index = newContacts.indexOf(contact);
          newContacts.splice(index, 1);
        }
        return newContacts;
      });

      this.setState({
        contacts: [...newContacts],
      });
    }
  };

  filterOnChange = (event) => {

    const enteredValue = event.target.value;

    this.setState({
      filter: enteredValue
    })

  }

  filterContacts = () => {

  const filter = this.state.filter;
    const allContacts = this.state.contacts;

   const filteredContacts =  allContacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))

    return filteredContacts
  }

  render() {

    const filtered = this.filterContacts();
    return (
      <div className={css.app}>
        <Section tittle="Phonebook">
          <Formular handleSubmit={this.handleSubmit} />
        </Section>
        <Section tittle="Contacts">
          <Filter filterOnChange={this.filterOnChange}/>
          <Contacts
            data={filtered}
            handleDelete={this.handleDelete}
          />
        </Section>
      </div>
    );
  }
}

export default App;
