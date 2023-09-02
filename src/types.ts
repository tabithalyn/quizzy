export type AnswerObj = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

export type Question = {
  category: number;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type Questions = Question & { answers: string[] };

export type CategoriesType = {
  name:string;
  id:number;
}

export const Difficulty = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard"
}

export const Category = {
  GENERAL: 9,
  BOOKS: 10,
  FILM: 11,
  MUSIC: 12,
  MUSICALS: 13,
  TELEVISION: 14,
  VIDEOGAMES: 15,
  NATURE: 17,
  COMPUTERS: 18,
  MATH: 19,
  MYTHOLOGY: 20,
  SPORTS: 21,
  GEOGRAPHY: 22,
  HISTORY: 23,
  POLITICS: 24,
  ART: 25,
  CELEBRITIES: 26,
  ANIMALS: 27,
  COMICS: 29,
  ANIMEMANGA: 31,
  CARTOONS: 32
}

type ObjectValues<T> = T[keyof T];

export type Difficulty = ObjectValues<typeof Difficulty>;
export type Category = ObjectValues<typeof Category>;