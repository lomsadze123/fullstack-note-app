import { useEffect, useState } from "react";
import userImg from "../assets/user.jpg";
import removeImg from "../assets/remove.webp";
import axios from "axios";
import Popup from "./Popup";
import { Link } from "react-router-dom";

interface User {
  id?: string;
  name: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState<User | null>(null);
  const [value, setValue] = useState({ name: "", password: "" });
  const [popup, setPopup] = useState(false);
  const [submitted, setSubmitted] = useState({ up: false, in: false });
  const [error, setError] = useState("");
  const [store, setStore] = useState("");

  const handleUserCreate = async () => {
    try {
      await axios.post("http://localhost:3001/api/users", {
        name: value.name,
        password: value.password,
      });
    } catch (error) {
      console.log(error);
      setError("failed");
    }
  };

  const handleUserLogIn = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        name: value.name,
        password: value.password,
      });

      localStorage.setItem("token", response.data.token);

      if (response.status === 200) {
        setError("success");
        setPopup(false);
      }
    } catch (error) {
      console.log(error);
      setError("failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.name && value.password) {
      setUsers({ name: value.name, password: value.password });
      setValue({ name: "", password: "" });
      setPopup(false);

      try {
        if (submitted.up) {
          await handleUserCreate();
        } else if (submitted.in) {
          await handleUserLogIn();
        }
      } catch (error) {
        setError("failed");
      }
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${users?.id}`);
      await axios.delete(`http://localhost:3001/api/notes`);
      setUsers({ name: "", password: "" });
      localStorage.removeItem("token");
      setStore("");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("token") ?? "";
    setStore(stored);

    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data[0]);
    };
    fetchUsers();
  }, [error]);

  return (
    <div className="text-white flex flex-col gap-4">
      <div className="flex flex-col justify-between h-[78vh]">
        <div key={users?.name} className="flex items-center gap-3">
          <Link
            onClick={() => {
              if (!store) {
                setError("unauthorized");
              }
            }}
            to={`/${store ? users?.id : ""}`}
            state={store}
            className="flex items-center gap-3"
          >
            <img
              className="w-full max-w-[50px] h-[52px] rounded-[50%]"
              src={userImg}
              alt="user image"
            />
            <h2 className="text-xl">{users?.name}</h2>
          </Link>
          {!!users?.name && (
            <img
              onClick={handleDelete}
              className="w-7 ml-auto"
              src={removeImg}
              alt="remove icon"
            />
          )}
        </div>

        {error === "" ? (
          <h3 className="text-center text-4xl">You can create only one user</h3>
        ) : (
          <h3 className="text-center text-4xl">
            {error === "success" && "WELCOME " + users?.name}{" "}
            {error === "unauthorized" && "Please Sign In"}
            {error === "failed" && "Wrong name or password"}
          </h3>
        )}
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
            disabled={!users?.name || !!store}
            className={`text-xl bg-blue-600 py-[10px] px-3 rounded ${
              (!users?.name || !!store) && "opacity-50"
            }`}
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
