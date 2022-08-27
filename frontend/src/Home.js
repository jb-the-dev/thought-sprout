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
    axios.post("/users/630a1ef790596421fdcbecfa/promptResponses", { //TODO make userId dynamic
      question: promptMessage,
      response: responseRef.current.value,
      userId: "630a1ef790596421fdcbecfa", //TODO make userId dynamic
      contactId: recipient._id,
    });
    navigate(`/contacts/${recipient._id}`)
  }

  return (
      <div id="Home">
        <div>
          { promptMessage ? (
            <>
              <p className="recipient">
                Your person: {recipient.firstName} {recipient.lastName}
              </p>
              <p className="prompt">{promptMessage}</p>
            </>
            )
            
            : (
                <p>
                  Hi! Thanks for stopping by. Hit 'Generate Prompt' and we'll serve you up one of your contacts with a prompt to help you think about them. Write a sentence or two, and submit your response to your Garden below.
                </p>
          )}
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
        { promptMessage ? (
          <>
            <button className="add-to-garden" onClick={() => sendPromptResponse()}>
              Add to my garden
            </button>
            <p>
              (*pssst*) Not feeling the person or the prompt right now? Just tap "Generate Prompt" again.
            </p>
          </>
          ) : ""
        }
        <Link to="/garden">View my garden</Link>
      </div>
  );
}

export default Home;