import React, { useState } from 'react';
import axios from 'axios';

const SendEmail = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/email/send', {
        email,
        subject,
        content,
      });

      if (response.status === 200) {
        setMessage('Email sent successfully!');
      } else {
        setMessage(`Error: ${response.data.errors}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while sending the email.');
    }
  };

  return (
    <div className="App">
      <h1>Email Sending Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          rows="4"
          cols="50"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <br />

        <input type="submit" value="Send Email" />
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SendEmail;
