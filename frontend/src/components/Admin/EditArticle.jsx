import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(`http://localhost:1998/api/articles/${id}`);
      setArticle(res.data);
    };
    fetchArticle();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1998/api/articles/${id}`,
        article
      );

      const message = response.data.message;

      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      navigate("/admin"); // redirect back to admin
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <h2>Update Article</h2>
      <form onSubmit={handleUpdate}>
        <input
          value={article.articleTitle}
          onChange={(e) =>
            setArticle({ ...article, articleTitle: e.target.value })
          }
          className="form-control mb-3"
        />
        <input
          type="date"
          value={article.articlePublishingDate?.substring(0, 10)}
          onChange={(e) =>
            setArticle({ ...article, articlePublishingDate: e.target.value })
          }
          className="form-control mb-3"
        />
        <textarea
          value={article.articleContent}
          onChange={(e) =>
            setArticle({ ...article, articleContent: e.target.value })
          }
          className="form-control mb-3"
        ></textarea>
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
};

export default EditArticle;
