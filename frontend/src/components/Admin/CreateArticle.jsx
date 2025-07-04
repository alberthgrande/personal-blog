import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateArticle = () => {
  const [form, setForm] = useState({
    articleTitle: "",
    articlePublishingDate: "",
    articleContent: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1998/api/articles",
        form
      );
      const message = response.data.message;

      setForm({
        articleTitle: "",
        articlePublishingDate: "",
        articleContent: "",
      });

      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      navigate("/admin");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to add article",
        text: error.response?.data?.message || error.message,

        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container py-5">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded bg-light mb-4"
      >
        <h4 className="mb-3">Create Article</h4>

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

        <button type="submit" className="btn btn-primary">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
