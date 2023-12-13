import { useState } from "react";

interface Types {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setValue: React.Dispatch<
    React.SetStateAction<{
      name: string;
      password: string;
    }>
  >;
  submitted: {
    up: boolean;
    in: boolean;
  };
  value: {
    name: string;
    password: string;
  };
  title: string;
}

const Popup = ({ handleSubmit, setValue, submitted, value, title }: Types) => {
  const [enter, setEnter] = useState(false);

  return (
    <div className="absolute h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
      <form
        onSubmit={(e) => {
          setEnter(true);
          handleSubmit(e);
        }}
        className="bg-white flex flex-col gap-8 items-center py-10 px-12 rounded"
      >
        <h1 className="text-black text-2xl font-bold">{title}</h1>
        <input
          onChange={(e) =>
            setValue((prevUser) => ({ ...prevUser, name: e.target.value }))
          }
          className={`w-[120%] text-lg text-black outline-0 border-[1px]  py-1 pl-3 rounded ${
            enter && !value.name ? "border-red-500" : "border-blue-500"
          }`}
          type="text"
          placeholder={`${
            submitted.up ? "Create New Username" : "write Username"
          }`}
        />
        {enter && !value.name && (
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
            enter && !value.password ? "border-red-500" : "border-blue-500"
          }`}
          type="password"
          placeholder={`${
            submitted.up ? "Create New Password" : "write Password"
          }`}
        />
        {enter && !value.password && (
          <p className="text-red-500 self-end mt-[-25px]">
            this field is required
          </p>
        )}
        <input className="hidden" type="submit" />
      </form>
    </div>
  );
};

export default Popup;
