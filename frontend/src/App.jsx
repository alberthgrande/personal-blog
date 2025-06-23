import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateArticle from "./components/Article/CreateArticle";
import EditArticle from "./components/Article/EditArticle";
import Swal from "sweetalert2";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

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
      <h1 className="mb-4 text-center">Articles Manager</h1>

      <div className="mb-4">
        {editingArticle ? (
          <EditArticle
            article={editingArticle}
            onUpdated={fetchArticles}
            onCancel={() => setEditingArticle(null)}
          />
        ) : (
          <CreateArticle onCreated={fetchArticles} />
        )}
      </div>

      <h2 className="mb-3">Articles List</h2>
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
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditingArticle(article)}
                  >
                    Edit
                  </button>
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

export default App;
