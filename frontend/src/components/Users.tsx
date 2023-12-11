import { useState } from "react";
import userImg from "../assets/user.jpg";

interface User {
  name: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [value, setValue] = useState({ name: "", password: "" });
  const [popup, setPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (value.name && value.password) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { name: value.name, password: value.password },
      ]);
      setValue({ name: "", password: "" });
      setPopup(false);
    }
  };

  return (
    <div className="text-white flex flex-col gap-4">
      {users.map((user) => (
        <div key={user.name} className="flex items-center gap-3">
          <img
            className="w-full max-w-[50px] h-[52px] rounded-[50%]"
            src={userImg}
            alt="user image"
          />
          <h2 className="text-xl">{user.name}</h2>
        </div>
      ))}
      <button
        onClick={() => setPopup(true)}
        className="text-xl bg-blue-600 py-[10px] px-3 rounded fixed bottom-3 left-[50px] right-[50px]"
      >
        Create User
      </button>
      {popup && (
        <div className="absolute h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white flex flex-col gap-8 items-center py-10 px-12 rounded"
          >
            <h1 className="text-black text-2xl font-bold">NEW USER</h1>
            <input
              onChange={(e) =>
                setValue((prevUser) => ({ ...prevUser, name: e.target.value }))
              }
              className={`w-[120%] text-lg text-black outline-0 border-[1px]  py-1 pl-3 rounded ${
                submitted && !value.name ? "border-red-500" : "border-blue-500"
              }`}
              type="text"
              placeholder="Create New Username"
            />
            {submitted && !value.name && (
              <p className="text-red-500 self-end mt-[-25px]">
                this field is required
              </p>
            )}
            <input
              onChange={(e) =>
                setValue((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }))
              }
              className={`w-[120%] text-lg text-black outline-0 border-[1px] border-blue-500 py-1 pl-3 rounded ${
                submitted && !value.password
                  ? "border-red-500"
                  : "border-blue-500"
              }`}
              type="password"
              placeholder="Create New Password"
            />
            {submitted && !value.password && (
              <p className="text-red-500 self-end mt-[-25px]">
                this field is required
              </p>
            )}
            <input className="hidden" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
