import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(resp => resp.json())
      .then(data => {
        setQuestions(data);
      });
  }, []);

  function handleAddQuestion(question) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    };

    fetch("http://localhost:4000/questions", config)
      .then(resp => resp.json())
      .then(data => {
        setQuestions(questions => {
          return [
            ...questions,
            data
          ]
        });
      });
  }

  function handleDeleteQuestion(questionId) {
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    };

    fetch(`http://localhost:4000/questions/${questionId}`, config)
      .then(resp => resp.json())
      .then(data => {
        console.log("Deleted!\n" + data)
        setQuestions(questions => {
          return questions.filter(question => {
            if (question.id === questionId) return false;
            return true;
          })
        })
      });
  }

  function handleChangeAnswer(questionId, newCorrectIndex) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": newCorrectIndex
      })
    };

    
    fetch(`http://localhost:4000/questions/${questionId}`, config)
      .then(resp => resp.json())
      .then(data => {
        console.log("Patched!\n" + data)
        setQuestions(questions => {
          return questions.map(question => {
            if (questionId === question.id) return {
              ...question,
              correctIndex: newCorrectIndex
            };
            return question;
          });
        })
      });
  }

  console.log(questions);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm
          onAddQuestion={handleAddQuestion}
        /> : <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onChangeAnswer={handleChangeAnswer}
        />
      }
    </main>
  );
}

export default App;
