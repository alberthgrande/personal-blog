import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

const Admin = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:1998/api/articles");
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the article permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:1998/api/articles/${id}`
        );
        const message = response.data.message;

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: message,
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        fetchArticles(); // Refresh the list
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: error.response?.data?.message || error.message,
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-self-center mb-4">
        <h1 className="text-center">Personal Blog</h1>
        <Link to="/articles/create" className="btn btn-sm btn-primary">
          + Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Publish Date</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article.articleTitle}</td>
                <td>
                  {new Date(article.articlePublishingDate).toLocaleDateString()}
                </td>
                <td>{article.articleContent}</td>
                <td>
                  <Link
                    to={`/articles/${article._id}/view`}
                    className="btn btn-info btn-sm me-2"
                  >
                    View
                  </Link>
                  <Link
                    to={`/articles/${article._id}/edit`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(article._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
