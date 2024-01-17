const SearchBox = ({ query, handleSearch }) => {
  return (
    <div className="flex justify-center items-center p-3 w-full fixed bg-color2">
      <input
        type="text"
        onChange={handleSearch}
        value={query}
        placeholder="Search"
        className="bg-gray-200 w-1/3 text-center border border-gray-500 rounded-lg"
      ></input>
    </div>
  );
};

export default SearchBox;
