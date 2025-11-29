// Conference.jsx
import React, { useState } from "react";
import "./Conference.css";

const Conference = () => {
  const [conference, setConference] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setConference(data);
    e.target.reset(); // clear form after submit
  };

  return (
    <div className="conference-box">
      <h2>Create Conference</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Conference Name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="datetime">Date & Time</label>
        <input type="datetime-local" id="datetime" name="datetime" required />

        <label htmlFor="venue">Venue</label>
        <input type="text" id="venue" name="venue" required />
        <label htmlFor="link">Conference Link:</label>
        <input type="text" id="link" name="link" required />
        <label htmlFor="meet">Meeting id:</label>
        <input type="text" id="meet" name="meet" required />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required></textarea>

        <button type="submit">Create Conference</button>
      </form>

      {conference && (
        <div className="conference-details">
          <h3>{conference.name}</h3>
          <p>
            <strong>Date & Time:</strong>{" "}
            {new Date(conference.datetime).toLocaleString()}
          </p>
          <p>
            <strong>Venue:</strong> {conference.venue}
          </p>
          <p>
            <strong>Meeting id:</strong> {conference.meet}
          </p>
          <p>
            <strong>Conference Link:</strong> {conference.link}
          </p>
          <p>
            <strong>Description:</strong> {conference.description}
          </p>
        </div>
      )}    </div>
  );
};

export default Conference;
