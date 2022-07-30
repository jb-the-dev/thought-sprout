import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const userId = "627d9f575cab57c66e023e67";

const Garden = () => {
  const [contacts, setContacts] = useState([]);
  const [promptResponsesByContact, setPromptResponsesByContact] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const contactResponse = await axios.get(`/users/${userId}/contacts`);
      const contacts = contactResponse.data;
      setContacts(contacts);
      const data = {};
      for (const contact of contacts) {
        const promptResponseResponse = await axios.get(
          `/contacts/${contact._id}/promptResponses`
        );
        data[contact._id] = promptResponseResponse.data;
      }
      setPromptResponsesByContact(data);
    };
    fetchData();
  }, []);

  async function handleDeleteContact(contactId) {
    await axios.delete(`/users/${userId}/contacts/${contactId}`);
    const filteredContacts = contacts.filter(
      (contact) => contact._id !== contactId
    );
    setContacts(filteredContacts);
  }

  return (
    <div>
      <h1>Garden</h1>
      <h2>Contacts</h2>
      {contacts.map((contact) => (
        <div key={contact._id}>
          <p>
            {contact.firstName} {contact.lastName} has{" "}
            <Link to={`/contacts/${contact._id}`}>
              {Object.keys(promptResponsesByContact).length
                ? promptResponsesByContact[contact._id].length
                : 0}{" "}
              prompt responses
            </Link>
          </p>
          <button onClick={() => handleDeleteContact(contact._id)}>
            Delete
          </button>
        </div>
      ))}
      <button>
        <Link to="/add-contact">Create Contact</Link>
      </button>
    </div>
  );
};

export default Garden;