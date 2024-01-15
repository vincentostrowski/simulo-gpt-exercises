const WordNewView = ({ word }) => {
  return (
    <div className="flex justify-center">
      <div className="w-1/3 p-2 flex justify-between">
        <div>{word.word}</div> <div>{word.newOrder}</div>
      </div>
    </div>
  );
};

export default WordNewView;
