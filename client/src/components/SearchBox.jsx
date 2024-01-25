const SearchBox = ({ query, handleSearch, handleNewToggle, newFilter }) => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center p-3 w-full fixed bg-opacity-100">
      <input
        type="text"
        onChange={handleSearch}
        value={query}
        placeholder="Search"
        className="bg-gray-200 w-1/3 text-center border border-gray-500 rounded-lg"
      ></input>
      <div className="flex justify-center w-full">
        <button
          className="bg-gray-300 text-xs text-color3 hover:text-gray-200 rounded-lg px-1"
          onClick={handleNewToggle}
        >
          {newFilter ? "All Words" : "New Queue"}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
