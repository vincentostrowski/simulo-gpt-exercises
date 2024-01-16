const QuestionList = ({ questions, className }) => {
  return (
    <div
      className={`${className} w-2/3 flex justify-center items-center w-2/3 text-shadow`}
    >
      <ul>
        {questions &&
          questions.map((question, index) => {
            return (
              <li key={index} className="mb-4">
                {question}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default QuestionList;
