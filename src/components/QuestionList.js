import React from "react";

import QuestionItem from "./QuestionItem";

function QuestionList({
  questions,
  onDeleteQuestion,
  onChangeAnswer,
}) {
  const questionItems = questions.map(question => {

    function handleDelete() {
      onDeleteQuestion(question.id);
    }

    function handleChangeAnswer(newCorrectIndex) {
      onChangeAnswer(question.id, newCorrectIndex)
    }

    return (
      <QuestionItem
        key={question.id}
        question={question}
        onDelete={handleDelete}
        onChangeAnswer={handleChangeAnswer}      
      />
    );
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
