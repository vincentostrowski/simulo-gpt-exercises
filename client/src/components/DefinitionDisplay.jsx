const DefinitionDisplay = ({ setRevealDefinition, revealDefinition }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 my-10 w-2/3 mb-28">
      <p>Recall the definition and how it fits the sentences above.</p>
      <div className="flex justify-center ">
        <button
          onClick={() => setRevealDefinition(true)}
          className="bg-sky-950 text-gray-200 py-1 px-3 rounded-full"
        >
          Reveal Definition
        </button>
      </div>
      {revealDefinition && (
        <div>
          API retrieved definition will go here: definition opics span from
          software engineering, system design, data engineering, leadership,
          management and all the way to product and business. How to start?
          There are a LOT of resources here and your time is very important. I
          don’t suggest trying to learn all of the resources at once, I suggest
          picking a few resources at a time from specific categories that you
          need the most. That’s what I do as well. When I need to go into more
          detail in a specific category, I choose the resources and do a deep
          dive into the specific topics. I also connect with certain
          individuals, check their posts and/or ask them questions. Important:
          Before you choose which resources you wish to go into more detail, I
          suggest doing a retrospective of your current skill set and defining
          where you need to improve. This will ensure you are spending your time
          on the most impactful things first!
        </div>
      )}
    </div>
  );
};

export default DefinitionDisplay;
