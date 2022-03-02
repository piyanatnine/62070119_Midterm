import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/homePage";
import Category from "./pages/categoryPage";
import PostContent from "./pages/postContentPage";
import AuthorProfile from "./pages/authorPage"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/62070119_midterm" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/post/:postId" element={<PostContent />} />
        <Route path="/author/:authorId" element={<AuthorProfile />} />
      </Routes>
    </div>
    
  );
}

export default App;
