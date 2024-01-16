const Loading = ({ message }) => {
  return (
    <div className="m-6 flex flex-col items-center">
      <div>{message}</div>
      <div>Click 'Add' on the bottom right to add to your vocabulary.</div>
    </div>
  );
};

export default Loading;
