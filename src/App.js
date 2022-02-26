import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/homePage";
import Category from "./pages/categoryPage";
import PostContent from "./pages/postContentPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/post/:postId" element={<PostContent />} />
      </Routes>
    </div>
    
  );
}

export default App;
