export interface NuclearReactorQuiz {
  title: string;
  questions: QuizQuestions;
  results: QuizResults;
}

export interface QuizQuestions {
  id: number;
  question: string;
  image: string;
  options: {
    id: number;
    name: string;
    alias: string;
  }[];
}[];

export interface QuizResults {
  type: string;
  title: string;
  description: string;
  image: string;
}[];
