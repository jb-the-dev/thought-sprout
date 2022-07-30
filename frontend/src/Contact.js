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

  return (
    <div>
      <h1>
        {contact?.firstName} {contact?.lastName}
      </h1>
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
      <button type="submit">Bundle blossoms</button>
      <button>
        <Link to={`/contacts/${contact?._id}/edit`}>Edit Contact</Link>
      </button>
    </div>
  );
}