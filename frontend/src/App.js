import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Garden from "./Garden";
import Contact from "./Contact";
import Home from "./Home";
import ContactInfo from "./ContactInfo";
import PromptResponse from "./PromptResponse";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">Home</Link> | <Link to="/garden">Garden</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/contacts/:contactId" element={<Contact />} />
          <Route path="/contacts/:contactId/edit" element={<ContactInfo />} />
          <Route path="/add-contact" element={<ContactInfo />} />
          <Route
            path="/promptResponses/:promptResponseId/edit"
            element={<PromptResponse />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;