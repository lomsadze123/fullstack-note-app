import { useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import removeImg from "../assets/remove.webp";
import axios from "axios";
import Popup from "./Popup";

interface User {
  name: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [value, setValue] = useState({ name: "", password: "" });
  const [popup, setPopup] = useState(false);
  const [submitted, setSubmitted] = useState({ up: false, in: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted({ up: true, in: true });

    if (value.name && value.password) {
      setUsers({ name: value.name, password: value.password });
      setValue({ name: "", password: "" });
      setPopup(false);

      try {
        await axios.post("http://localhost:3001/api/users", {
          name: value.name,
          password: value.password,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data[0]);
    };
    fetchUsers();
  }, []);

  return (
    <div className="text-white flex flex-col gap-4">
      <div className="flex flex-col justify-between h-[78vh]">
        <div key={users?.name} className="flex items-center gap-3">
          <img
            className="w-full max-w-[50px] h-[52px] rounded-[50%]"
            src={userImg}
            alt="user image"
          />
          <h2 className="text-xl">{users?.name}</h2>
          {!!users?.name && (
            <img className="w-7 ml-auto" src={removeImg} alt="remove icon" />
          )}
        </div>

        <h3 className="text-center text-4xl">You can create only one user</h3>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setPopup(true);
              setSubmitted({ up: true, in: false });
            }}
            disabled={!!users?.name}
            className={`text-xl bg-blue-600 py-[10px] px-3 rounded ${
              users?.name && "opacity-50"
            }`}
          >
            Create User
          </button>
          <button
            onClick={() => {
              setPopup(true);
              setSubmitted({ up: false, in: true });
            }}
            className="text-xl bg-blue-600 py-[10px] px-3 rounded"
          >
            Sign In
          </button>
        </div>
      </div>
      {popup && (
        <Popup
          handleSubmit={handleSubmit}
          setValue={setValue}
          submitted={submitted}
          value={value}
          title="NEW USER"
        />
      )}
    </div>
  );
};

export default Users;
