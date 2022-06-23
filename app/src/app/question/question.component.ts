import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

import { Game } from '../game.model';
import { Question } from '../service/question.model';
import { GameService } from '../game.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  // Form data
  public name: string="";
  public totalQuestions: string = "";
  public category: string = "";
  public level: string = "";
  public questionType: string = "";
  public COUNTER_INITIAL: number = 20;

  // Internal
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = this.COUNTER_INITIAL;
  public correctAnswer: number = 0;
  public incorrectAnswer: number = 0;
  interval$:any;
  progress:string="0";
  isQuizCompleted: boolean = false;
  secondsLabel:string = "''";
  questionsLeftLabel:string = "Pregunta";
  questionsLeftOfLabel:string = "de";
  pointsLabel:string = "Puntos";
  welcolmeLabel:string = "Bienvenido, ";
  titleQuiz:string = "Questionados";
  sleepQuestionInterval:number = 500;
  constructor(private questionService : QuestionService, private gameService: GameService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.totalQuestions = localStorage.getItem("totalQuestions")!;
    this.category = localStorage.getItem("category")!;
    this.level = localStorage.getItem("level")!;
    this.questionType = localStorage.getItem("questionType")!;

    this.getAllQuestions();
    this.startCounter();
  }
  getAllQuestions(){
    this.questionService.getQuestions()
    .subscribe((res)=>{
      this.questionList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Question)
        }
      });
      this.questionList = _.shuffle(this.questionList);
      this.questionList = this.questionList.map(function(question) {
        question.options = _.shuffle(question.options);
        return question;
     });
    });
  }
  nextQuestion(){
    this.currentQuestion++;
  }
  prevQuestion(){
    this.currentQuestion--;
  }

  updateGame(correct: number, questions: number, score: number, user: string, wrong: number){
    this.gameService.updateGame({
      correct: correct,
      questions: questions,
      score: score,
      user: user,
      wrong: wrong
    } as Game, localStorage.getItem("gameID"))
  }

  answer(currentQno: number, option:any){
    if (currentQno === this.questionList.length){
      // END GAME
      this.isQuizCompleted = true;
      this.stopCounter();
      this.updateGame(
        this.correctAnswer,
        this.questionList.length,
        this.points,
        localStorage.getItem("name"),
        this.incorrectAnswer,
      )
    }
    if(option.correct){
      this.points += 10 * this.counter;
      this.correctAnswer++;
      setTimeout(()=>{
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, this.sleepQuestionInterval);

    } else {
      setTimeout(()=>{
        this.incorrectAnswer++;
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, this.sleepQuestionInterval);
      this.points -= 1;
    }
  }
  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{
      this.counter--;
      if (this.counter==0){
        this.currentQuestion++;
        this.counter=this.COUNTER_INITIAL;
        this.points-=5;
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe();
    }, 6000000)
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.stopCounter();
    this.counter = this.COUNTER_INITIAL;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter=this.COUNTER_INITIAL;
    this.currentQuestion =0;
    this.progress = "0";
  }
  getProgressPercent(){
    this.progress = ((this.currentQuestion/this.questionList.length) * 100).toString()
    return this.progress;
  }

}
