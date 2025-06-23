import React, { useState } from "react";
import axios from "axios";

const CreateArticle = ({ onCreated }) => {
  const [form, setForm] = useState({
    articleTitle: "",
    articlePublisingDate: "",
    articleContent: "",
  });

  const handleChange = (e) => {
    setForm({ ...CreateArticle, [e.target.form]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/api/articles", form);
    setForm({ articleTitle: "", articlePublisingDate: "", articleContent: "" });
    onCreated();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Article</h2>
        <input
          type="text"
          name="articleTitle"
          placeholder="Tile"
          value={form.articleTitle}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="date"
          name="artilePublisingDate"
          value={form.articlePublisingDate}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="articleContent"
          value={form.articleContent}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Article</button>
      </form>
    </div>
  );
};

export default CreateArticle;
