const DefinitionDisplay = ({
  setRevealDefinition,
  revealDefinition,
  definitions,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 my-10 w-2/3 mb-28">
      <div className="flex flex-col items-center text-shadow">
        <p>Recall the definition and how it fits the sentences above.</p>
        <p>Then try using it in a sentence of your own.</p>
      </div>
      <div className="flex justify-center ">
        <button
          onClick={() => setRevealDefinition(true)}
          className="bg-sky-950 text-gray-200 py-1 px-3 rounded-full shadow-lg"
        >
          Reveal Definition
        </button>
      </div>
      {revealDefinition && (
        <div className="text-shadow">
          {
            <ul>
              {definitions.definitions.map((def, index) => {
                return (
                  <li
                    key={index}
                  >{`${def.partOfSpeech}: ${def.definition}`}</li>
                );
              })}
            </ul>
          }
        </div>
      )}
    </div>
  );
};

export default DefinitionDisplay;
