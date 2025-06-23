import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Index";
import Admin from "./components/Admin/Index";

import CreateArticle from "./components/Admin/CreateArticle";
import EditArticle from "./components/Admin/EditArticle";
import ViewArticle from "./components/Admin/ViewArticle";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Article & Blog */}
        <Route path="/articles/create" element={<CreateArticle />} />
        <Route path="/articles/:id/edit" element={<EditArticle />} />
        <Route path="/articles/:id/view" element={<ViewArticle />} />
      </Routes>
    </Router>
  );
};

export default App;
