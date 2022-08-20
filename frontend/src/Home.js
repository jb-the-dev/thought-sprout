import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

import "./Home.css";

function Home() {
  const [promptMessage, setPromptMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const responseRef = useRef();
  const navigate = useNavigate();

  async function generatePrompt() {
    const response = await axios.get("/prompts");
    setPromptMessage(response.data.prompt);
    setRecipient(response.data.contact);
  }

  function sendPromptResponse() {
    axios.post("/users/6300fb8f2d244e59d544bb17/promptResponses", { //TODO make dynamic
      question: promptMessage,
      response: responseRef.current.value,
      userId: "6300fb8f2d244e59d544bb17", //TODO make dynamic
      contactId: recipient._id,
    });
    navigate(`/contacts/${recipient._id}`)
  }

  return (
    <div id="Home">
      <h1>Welcome to Brain Blast!</h1>
      <div>
        <p className="recipient">
          {recipient.firstName} {recipient.lastName}
        </p>
        <p className="prompt">{promptMessage}</p>
      </div>
      <button className="generate-prompt" onClick={() => generatePrompt()}>
        Generate Prompt
      </button>
      <textarea
        ref={responseRef}
        rows="3"
        className="response"
        placeholder="Write your response to this recipient and prompt here"
      ></textarea>
      <button className="add-to-garden" onClick={() => sendPromptResponse()}>
        Add to my garden
      </button>
      <Link to="/garden">View my garden</Link>
    </div>
  );
}

export default Home;