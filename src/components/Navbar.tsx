const Navbar = () => {
  return (
    <header className="flex items-center bg-[#96B6C5] p-4 rounded-md">
      <div className="text-2xl font-bold grow-[2]">Hanaro Album</div>
      <div className="flex justify-center font-semibold grow-[1] gap-2">
        <div>3</div>
        <div>Bret</div>
      </div>
      <button className="font-semibold cursor-pointer">Sign Out</button>
    </header>
  );
};

export default Navbar;
