import React, { useState, useEffect } from "react";
import axios from "axios";

const EditArticle = ({ article, onUpdated, onCancel }) => {
  const [form, setForm] = useState(article);

  useEffect(() => {
    setForm(article);
  }, [article]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/articles/${article._id}`, form);
    onUpdated(); // refresh list
    onCancel(); // hide edit form
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Edit Article</h2>
      <input
        type="text"
        name="articleTitle"
        placeholder="Title"
        value={form.articleTitle}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="date"
        name="articlePublishingDate"
        value={form.articlePublishingDate}
        onChange={handleChange}
        required
      />
      <br />
      <textarea
        name="articleContent"
        placeholder="Content"
        value={form.articleContent}
        onChange={handleChange}
        required
      />
      <br />
      <button type="submit">Update</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditArticle;
