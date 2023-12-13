import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface User {
  id?: string;
  title: string;
  date: Date;
}

const User = () => {
  const [data, setData] = useState<User[]>([]);
  const [value, setValue] = useState("");
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/notes",
          {
            title: value,
            userId: location.pathname.slice(1),
          },
          {
            headers: {
              Authorization: `Bearer ${location.state}`,
            },
          }
        );

        response.data.id &&
          data &&
          setData((prevData) => [...prevData, response.data]);
        setValue("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/notes");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <form onSubmit={handleSubmit} className="w-full px-8">
        <input
          className="w-full outline-0 border-[1px] border-blue-500 py-1 pl-3 rounded text-lg"
          onChange={(e) => setValue(e.target.value)}
          type="text"
          value={value}
          placeholder="write your note"
        />
      </form>
      <ul className="flex flex-col gap-2">
        {data &&
          data.map((note) => (
            <li key={note.id} className="text-xl text-white">
              {note.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default User;
