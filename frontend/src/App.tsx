import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  return (
    <div className="px-3 min-h-screen flex flex-col items-center">
      <div className="w-[300px] md:w-[455px]">
        <Header />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:id" element={<User />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
