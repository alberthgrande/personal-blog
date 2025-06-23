import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:1998/api/articles");
    console.log(res.data.articleTitle);
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container">
      <div className="container-fluid">
        <h1>Peronale Blog</h1>
        <table>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>
                {" "}
                <Link to={`/articles/${article._id}/view`}>
                  {article.articleTitle}
                </Link>
              </td>
              <td>
                {new Date(article.articlePublishingDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Home;
