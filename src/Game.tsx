import { useEffect, useState } from "react";
import { fetchQuestions } from "./API";
import QuestionCard from "./components/QuestionCard";
import { AnswerObj, CategoriesType, Questions } from "./types";
import axios from "axios";

export default function Game() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const [openSettings, setOpenSettings] = useState(true);
  const [allCategories, setAllCategories] = useState<CategoriesType[]>([]);
  const [chosenCategory, setCategory] = useState("");
  const [chosenDifficulty, setDifficulty] = useState("");
  const [chosenNumQuestions, setNumQuestions] = useState(0);

  useEffect(() => {
    const url = "https://opentdb.com/api_category.php";
    const fetch = async () => {
      try {
        const {data} = await axios.get(url);
        setAllCategories(data.trivia_categories);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const toggleSettings = () => {
    setOpenSettings((openSettings) => !openSettings);
  }

  const startTrivia = async () => {
    toggleSettings();
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(
      chosenNumQuestions,
      chosenDifficulty,
      parseInt(chosenCategory)
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: { currentTarget: { value: string; }; }) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  }

  // https://github.com/weibenfalk/react-quiz/tree/master/src

  const toNextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === chosenNumQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
    {openSettings && (
      <form onSubmit={(e) => {e.preventDefault()}}>
        <span>Choose a Category: <span className="text-red-600 bold">*</span></span>
        <select
          name="category"
          id="category"
          value={chosenCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white p-3 my-6"
          required
        >
          <option value=""></option>
          {allCategories.map((category:CategoriesType, id:number) => (
            <option key={id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <span>Choose a Difficulty: <span className="text-red-600 bold">*</span></span>
        <select
          name="difficulty"
          id="difficulty"
          value={chosenDifficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full bg-white p-3 my-6"
          required
        >
          <option value=""></option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <span>Choose # of Questions: <span className="text-red-600 bold">*</span></span>
        <select
          name="num_questions"
          id="num_questions"
          value={chosenNumQuestions}
          onChange={(e) => setNumQuestions(parseInt(e.target.value))}
          className="w-full bg-white p-3 my-6"
          required
        >
          <option value="0"></option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
        
        <p className="w-full flex items-center justify-center">
          <button
            type="button"
            className="bg-indigo-400 p-3 rounded-lg text-lg uppercase font-light hover:bg-indigo-200 transition-all disabled:bg-indigo-200 disabled:text-indigo-300 disabled:hover:bg-indigo-200 disabled:hover:text-indigo-300"
            onClick={startTrivia}
            disabled={chosenCategory === "" || chosenDifficulty === "" || chosenNumQuestions === 0 }
          >Start</button>
        </p>
      </form>
    )}
    {gameOver || userAnswers.length === chosenNumQuestions && (
      <p className="w-full flex justify-center"><button className="bg-indigo-400 p-3 rounded-lg text-lg uppercase font-light hover:bg-indigo-200 transition-all" onClick={() => window.location.reload()}>New Game</button></p>
    )}
    {!gameOver ? <p className="score">Score: {score}</p> : null}
    {loading ? <p>Loading Questions...</p> : null}
    {!loading && !gameOver && (
      <QuestionCard
        questionNum={number + 1}
        totalQuestions={chosenNumQuestions}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
    )}
    {!gameOver && !loading
    && userAnswers.length === number + 1
    && number !== chosenNumQuestions - 1 ? (
      <button className="bg-indigo-400 p-3 rounded-lg uppercase font-light hover:bg-indigo-200 transition-all" onClick={toNextQuestion}>
        Next Question
      </button>
    ): null}
    </>
  );
}