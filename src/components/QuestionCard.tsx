import { AnswerObj } from "../types";
import parse from "html-react-parser";
import { ButtonWrapper } from "./QuestionCard.styles";

type CardProps = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObj | undefined;
  questionNum: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question, answers, callback, userAnswer, questionNum, totalQuestions
}:CardProps) => {

  return (
    <div className="flex flex-wrap justify-center items-center w-full">
      <p className="p-2 my-4 bg-sky-100 rounded-lg w-full text-center">
        {questionNum} / {totalQuestions}
      </p>
      <p className="w-full text-center my-4">{parse(question)}</p>
      <div className="w-full my-2">
        {answers.map((answer) => (
          <ButtonWrapper
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            className="w-full"
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
              className="w-full hover:cursor-pointer"
            >
              <span>{parse(answer)}</span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;