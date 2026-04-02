import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skills: "",
    industry: "",
    location: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        ...form,
        skills: form.skills.split(",").map(s => s.trim())
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
    } else {
      alert(data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

      <input name="skills" placeholder="Skills (python, react...)" onChange={handleChange} />
      <input name="industry" placeholder="Industry" onChange={handleChange} />
      <input name="location" placeholder="Location" onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;