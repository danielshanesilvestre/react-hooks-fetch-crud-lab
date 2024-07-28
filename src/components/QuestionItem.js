import React from "react";

function QuestionItem({
  question,
  onDelete,
  onChangeAnswer
}) {
  const { id, prompt, answers, correctIndex } = question;

  function handleClick(event) {
    console.log("Registered click!")
    onDelete();
  }

  function handleChange(event) {
    console.log("Registered change!")
    onChangeAnswer(event.target.value);
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
