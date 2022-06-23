import { Component, OnInit } from '@angular/core';
import { Question } from '../service/question.model';

import { QuestionService } from '../service/question.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public questionList: any = [];
  public questionSelected: Question;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  thereIsQuestions(): boolean {
    return this.questionList.length > 1;
  }

  toString(item: any): string {
    return JSON.stringify(item);
  }

  generateQuestions(): void {
    this.questionService.getQuestionJson()
      .subscribe((res)=>{
        for (let index = 0; index < res.questions.length; index++) {
          let question = res.questions[index];
          this.createQuestion(question)
        }
      });
  }

  getQuestions(): void {
    this.questionService.getQuestions()
    .subscribe((res)=>{
      this.questionList = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Question)
        }
      });
    });
  }

  createQuestion(question: Question):void {
      this.questionService.createQuestion(question, console.log, console.log);
  }

  deleteQuestion(question: Question):void {
    this.questionService.deleteQuestion(question);
  }

  popup(question:Question):void {
    this.questionSelected = question;
  }

  addQuestion():void {
    this.questionSelected = null;
  }

}
