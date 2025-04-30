import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import UploadResult from "./pages/UploadResult";
import StudentResult from "./pages/StudentResult";
import SearchForm from "./pages/SearchForm";
import ResultPage from "./pages/ResultPage";
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
        {/* <Route path="/" element={<StudentResult />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/upload" element={<UploadResult />} /> */}

        <Route path="/" element={<SearchForm />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
