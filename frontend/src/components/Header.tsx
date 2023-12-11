import note from "../assets/note.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center pt-3 mb-7">
      <h1 className="text-3xl text-white font-bold">NOTE APP</h1>
      <img className="w-full max-w-[80px]" src={note} alt="note image" />
    </div>
  );
};

export default Header;
