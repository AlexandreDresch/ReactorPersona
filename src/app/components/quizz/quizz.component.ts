import { Component } from '@angular/core';
import { QuizQuestions, QuizResults } from 'src/app/types/quiz';
import quizzData from '../../../assets/quizzData.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss'],
})
export class QuizzComponent {
  title = '';
  language = '';
  languageSelected = false;
  questions: QuizQuestions[] = [];
  selectedQuestion: QuizQuestions = {} as QuizQuestions;
  answers: string[] = [];
  selectedAnswer: QuizResults = {} as QuizResults;
  questionIndex = 0;
  questionMaxIndex = 0;
  finished = false;

  fetchData() {
    if (quizzData) {
      this.finished = false;

      const languageData = this.language === 'portuguese' ? quizzData.portuguese : quizzData.english;

      this.title = languageData.title;
      this.questions = languageData.questions;
      this.selectedQuestion = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  selectChoice(alias: string) {
    this.answers.push(alias);
    this.moveNext();
  }

  async moveNext() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.selectedQuestion = this.questions[this.questionIndex];
    } else {
      const finalAnswer = await this.checkResult(this.answers);
      this.finished = true;

      const results = this.language === 'english' ? quizzData.english.results : quizzData.portuguese.results;

      const foundItem = results.find(item => item.type === finalAnswer);

      if (foundItem) {
        this.selectedAnswer = foundItem;
        console.log(this.selectedAnswer);
      }
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((prev, curr, i, arr) =>
      (arr.filter(item => item === prev).length > arr.filter(item => item === curr).length) ? prev : curr
    );
    return result;
  }

  restartGame() {
    this.answers = [];
    this.questionIndex = 0;
    this.selectedQuestion = this.questions[this.questionIndex];
    this.finished = false;
  }

  setLanguage(language: string) {
    this.language = language;
    this.languageSelected = true;
    this.fetchData();
  }
}
