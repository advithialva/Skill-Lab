import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Myblogs from "./components/myblogs";
import About from "./components/about";
import Update from "./components/update";
import "./App.css";

function App() {
  return (
    <>
    <div className="app">
      <header className="app-header">
        <h2>Blog</h2>
      </header>
      
      <BrowserRouter>
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Myblogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
