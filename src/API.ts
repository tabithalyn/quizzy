import { Difficulty, Question, Questions, Category } from "./types";

export const shuffleArray = (array: string[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const fetchQuestions = async (amount: number, difficulty: Difficulty, category:Category): Promise<Questions[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
  }))
};

export { Difficulty }; 
export type { Questions };

