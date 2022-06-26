import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Question } from '../service/question.model';

import { FormBuilder, FormGroup } from '@angular/forms';

import { QuestionService } from '../service/question.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public questionList: any = [];
  public questionSelected: Question;
  public questionForm: FormGroup;
  searchTerm: string;

  @ViewChild('questionText') questionTextKey!: ElementRef;
  @ViewChild('options') optionsKey!: ElementRef;
  @ViewChild('explanation') explanationKey!: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef
  @ViewChild('searchInput') searchInput: ElementRef
  constructor(private questionService: QuestionService, formBuilder: FormBuilder) {
    this.questionForm = formBuilder.group({
      questionText: [""],
      options: [""],
      explanation: [""],
    })
   }

  ngOnInit(): void {
    this.getQuestions();
  }

  thereIsQuestions(): boolean {
    return this.questionList.length > 1;
  }

  onSubmit() {
    if (this.questionSelected) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
    this.closeModal.nativeElement.click();
  }

  onCreate() {
    this.questionForm.controls['options'].setValue(JSON.parse(this.questionForm.controls['options'].value));
    this.questionService.createQuestion(this.questionForm.value, console.log, console.log);
  }

  onUpdate() {
    this.questionForm.controls['questionText'].markAsTouched();
    this.questionForm.controls['questionText'].setValue(this.questionTextKey.nativeElement.value);
    this.questionForm.controls['options'].markAsTouched();
    this.questionForm.controls['options'].setValue(JSON.parse(this.optionsKey.nativeElement.value));
    this.questionForm.controls['explanation'].markAsTouched();
    this.questionForm.controls['explanation'].setValue(this.explanationKey.nativeElement.value);
    this.questionService.updateQuestion(this.questionForm.value, this.questionSelected.id);
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

  search(): void {
    let value = this.searchInput.nativeElement.value;
    this.searchTerm = value;
  }
}
