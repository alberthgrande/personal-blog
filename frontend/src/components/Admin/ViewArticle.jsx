import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await axios.get(`http://localhost:1998/api/articles/${id}`);
      setArticle(res.data);
    };
    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container py-5">
      <h1>{article.articleTitle}</h1>
      <p>
        <strong>Published on:</strong>{" "}
        {new Date(article.articlePublishingDate).toLocaleDateString()}
      </p>
      <p>{article.articleContent}</p>
    </div>
  );
};

export default ViewArticle;
