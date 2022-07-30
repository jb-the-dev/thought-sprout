import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const userId = "62e53e70e1d41c7b662489a5"; //TODO make dynamic

const ContactInfo = () => {
  const [currentContact, setCurrentContact] = useState();
  const navigate = useNavigate();

  const { contactId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/contacts/${contactId}`);
      setCurrentContact(response.data);
    };
    if (contactId) {
      fetchData();
    }
  }, [contactId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newContact = {
      userId,
      contact: {
        email: formData.get("email"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        notes: formData.get("notes"),
      },
    };
    if (currentContact) {
      await axios.put(`/contacts/${contactId}`, newContact);
      navigate("/garden");
    } else {
      await axios.post("/contacts", newContact);
      navigate("/garden");
    }
  }

  return (
    <div>
      <h2>Contact Info</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            defaultValue={currentContact?.firstName}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            defaultValue={currentContact?.lastName}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            defaultValue={currentContact?.email}
          />
        </label>
        <label>
          Notes:
          <textarea name="notes" defaultValue={currentContact?.notes} />
        </label>
        <button type="submit">Add/Update Contact</button>
      </form>
    </div>
  );
  // build image uploader (no clue how)
};

export default ContactInfo;