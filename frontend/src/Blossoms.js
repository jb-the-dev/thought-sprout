import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// this will be a paragraph of text, stringing the promptResponses together.
export default function Blossoms() {
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

  let paragraph = promptResponses.map((thought) => (
    <>
      <h1>{thought.question}</h1>
      <p>{thought.response}</p>
    </>
  ));

  return (
    <>
      {paragraph}
      <button>Send Paragraph</button>
    </>
  );
}
