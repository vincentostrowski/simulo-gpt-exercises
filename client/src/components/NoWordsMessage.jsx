// Component to display when no words returned on a view
const NoWordsMessage = ({ message }) => {
  return (
    <div className="m-6 flex flex-col items-center">
      <div>{message}</div>
      <div>Click 'Add' on the bottom right to add to your vocabulary.</div>
    </div>
  );
};

export default NoWordsMessage;
