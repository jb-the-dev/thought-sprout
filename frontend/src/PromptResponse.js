import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function PromptResponse() {
  const [promptResponse, setPromptResponse] = useState(null);
  const { promptResponseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/promptResponses/${promptResponseId}`);
      setPromptResponse(response.data);
    };
    fetchData();
  }, [promptResponseId]);

  // async function handleDeleteResponse(responseId) {
  //   await axios.delete(`/promptResponses/${responseId}`);
  // }

  async function handleSubmitResponse(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const updatedResponse = {
      response: formData.get("response"),
    };
    await axios.patch(`/promptResponses/${promptResponseId}`, updatedResponse);
    // TODO this is not working ('no route match found'); look at App.js routes
    navigate(`/contacts/${promptResponse.contactId}`);
  }

  return (
    <form onSubmit={handleSubmitResponse}>
      <p>{promptResponse?.question}</p>
      <textarea
        rows="3"
        name="response"
        defaultValue={promptResponse?.response}
      />
      <button type="submit">Save Response</button>
    </form>
  );
}