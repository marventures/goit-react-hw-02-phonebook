import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
  };

  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { addContact, contacts } = this.props;

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    addContact(newContact);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.formField}>
          <p className={css.formLabel}>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={this.handleNameChange}
          />
        </label>

        <label className={css.formField}>
          <p className={css.formLabel}>Number</p>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleNumberChange}
          />
        </label>
        <button className={css.formButton} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
