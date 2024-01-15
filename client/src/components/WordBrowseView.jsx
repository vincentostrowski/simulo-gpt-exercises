const WordBrowseView = ({ word }) => {
  return (
    <div className="flex justify-center">
      <div className="w-1/3 p-2">{word.word}</div>
    </div>
  );
};

export default WordBrowseView;
