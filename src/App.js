import React, { useState } from 'react';
import './App.css';

function App() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [responseData, setResponseData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        setResponseData(data);
    };

   return (
       <div className="contact-form">
           <h1>Contact Form</h1>
           <form onSubmit={handleSubmit}>
               <label htmlFor="name">Name</label>
               <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
               <label htmlFor="email">Email</label>
               <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
               <label htmlFor="message">Message</label>
               <textarea name="message" placeholder="Message" onChange={handleChange} required></textarea>
               <button type="submit">Submit</button>
           </form>
           {responseData && (
               <div>
                   <h2>Response from Server:</h2>
                   <pre>{JSON.stringify(responseData, null, 2)}</pre>
               </div>
           )}
       </div>
   );
}

export default App;