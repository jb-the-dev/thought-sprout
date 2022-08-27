import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Contact() {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [promptResponses, setPromptResponses] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/contacts/${contactId}`);
      setContact(response.data);
      const response1 = await axios.get(
        `/contacts/${contactId}/promptResponses`
      );
      setPromptResponses(response1.data);
    };
    fetchData();
  }, [contactId]);

  async function handleDeleteResponse(responseId) {
    await axios.delete(`/promptResponses/${responseId}`);
    const filteredResponses = promptResponses.filter(
      (promptResponse) => promptResponse._id !== responseId
    );
    setPromptResponses(filteredResponses);
  }

  //TODO build onSubmit handler for bundle blossoms
  
  return (
    <div>
      <h1>
        {contact?.firstName} {contact?.lastName}
      </h1>
      <h3>
        Email: {contact?.email}
      </h3>
      <h4>
        Notes about {contact?.firstName}: {contact?.notes}
      </h4>
      <button>
        <Link to={`/contacts/${contact?._id}/edit`}>Edit Contact</Link>
      </button>
      <h3>Prompt Responses</h3>
      {promptResponses.map((respObj) => (
        <div key={respObj._id}>
          <p>
            {respObj.question}: {respObj.response}
          </p>
          <button>
            <Link to={`/promptResponses/${respObj._id}/edit`}>Edit</Link>
          </button>
          <button onClick={() => handleDeleteResponse(respObj._id)}>
            Delete
          </button>
        </div>
      ))}
      <button>
        <Link to={`/contacts/${contact?._id}/blossoms`}>Bundle Blossoms</Link>
      </button>
    </div>
  );
}