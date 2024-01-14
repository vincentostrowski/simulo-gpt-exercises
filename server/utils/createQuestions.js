const openai = require("../utils/openai");

const createQuestions = async (word, amount, prev = []) => {
  const questions = [];

  let prevQuestions = "";
  if (prev.length > 0 && prev[0] !== "") {
    prevQuestions = "Do not duplicate any of these: " + prev.join(", ");
  }

  const message = `Make ${amount} fill in the blank exercises that are missing the word: ${word}. 
    your respone should only contain the numbered questions.
    
    ${prevQuestions}
    
    In many fill-in-the-blank exercises, especially those that focus on broadening vocabulary, there's often the possibility that synonyms or other contextually appropriate words could fit into the blanks. However, the primary goal of these exercises is to reinforce the specific word being learned.
    
    **Narrow the Context**: Craft sentences where the specific nuances of the target word are highlighted, making it the most suitable choice. This approach requires a deep understanding of the word's specific connotations and typical usage.
    
    **Provide Multiple Blanks**: Design sentences with multiple blanks where the target word is the only one that can logically and grammatically fit all of them.
    
    **Use Specific Clues**: Include clues in the sentence that steer the user towards the target word, rather than its synonyms.`;
  //generate 5, place in document, save into DB

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    temperature: 0,
    max_tokens: 1000,
  });

  const responseString = response.choices[0].message.content;

  // Regular expression to extract fill-in-the-blank questions
  const regex = /\d+\.\s(.+)/g;
  let match;

  // Iterate over matches and add to the array
  while ((match = regex.exec(responseString)) !== null) {
    questions.push(match[1]);
  }

  return questions;
};

module.exports = createQuestions;
