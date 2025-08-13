import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          {/* navbar */}
          <Navbar />
        </BrowserRouter>

        {/* other components */}
      </div>
    </>
  );
}

export default App;
