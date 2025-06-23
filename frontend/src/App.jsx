import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateArticle from "./components/Article/CreateArticle";
import EditArticle from "./components/Article/EditArticle";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:3000/api/articles");
    setArticles(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div
      className="App"
      style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      <h1>Articles Manager</h1>

      {editingArticle ? (
        <EditArticle
          article={editingArticle}
          onUpdated={fetchArticles}
          onCancel={() => setEditingArticle(null)}
        />
      ) : (
        <CreateArticle onCreated={fetchArticles} />
      )}

      <h2>Articles List</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <strong>{article.articleTitle}</strong> —{" "}
            {new Date(article.articlePublishingDate).toLocaleDateString()}
            <p>{article.articleContent}</p>
            <button onClick={() => setEditingArticle(article)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
