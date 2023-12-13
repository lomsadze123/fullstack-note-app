import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  return (
    <div className="px-3 min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:id" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
