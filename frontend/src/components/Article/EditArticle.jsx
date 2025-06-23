import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const EditArticle = ({ article, onUpdated, onCancel }) => {
  const formatDate = (date) => new Date(date).toISOString().split("T")[0];

  const [form, setForm] = useState({
    ...article,
    articlePublishingDate: formatDate(article.articlePublishingDate),
  });

  useEffect(() => {
    setForm({
      ...article,
      articlePublishingDate: formatDate(article.articlePublishingDate),
    });
  }, [article]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:1998/api/articles/${article._id}`,
        form
      );
      const message = response.data.message;

      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      
      onUpdated(); // refresh list
      onCancel(); // hide edit form
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || error.message,
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <form onSubmit={handleUpdate} className="border p-4 rounded bg-light mb-4">
      <h4 className="mb-3">Edit Article</h4>

      <div className="mb-3">
        <input
          type="text"
          name="articleTitle"
          className="form-control"
          placeholder="Title"
          value={form.articleTitle}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="date"
          name="articlePublishingDate"
          className="form-control"
          value={form.articlePublishingDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          name="articleContent"
          className="form-control"
          placeholder="Content"
          rows="4"
          value={form.articleContent}
          onChange={handleChange}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          Update
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditArticle;
