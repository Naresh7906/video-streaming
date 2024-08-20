import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { PublishStream } from "./components/publishStream";
import { ReceiveStream } from "./components/receiveStream";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/publish" element={<PublishStream />} />
          <Route path="/receive" element={<ReceiveStream />} />
          <Route path="/" element={<PublishStream />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
