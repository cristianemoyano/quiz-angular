import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Modelo
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private angularFirestore: AngularFirestore) { }

  getQuestionJson(){
    return this.http.get<any>("assets/questions.json");
  }

  // CRUD
  getQuestions() {
    return this.angularFirestore
            .collection("questions")
            .snapshotChanges()

  }
  getQuestionById(id: string) {
    return this.angularFirestore
            .collection("questions")
            .doc(id)
            .valueChanges()
    
  }
  createQuestion(question: Question, callback: Function, onError: Function) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore
          .collection("questions")
          .add(question)
          .then((response)=>{
            callback(response)
          },
          (error) => {
            onError(error)
          })
    });
  }
  updateQuestion(question: Question, id: string) {
    return this.angularFirestore
          .collection("questions")
          .doc(id)
          .update({
            questionText: question.questionText,
            options: question.options,
            explanation: question.explanation,
          })
  }
  deleteQuestion(question: Question){
    return this.angularFirestore
        .collection("questions")
        .doc(question.id)
        .delete()
  }
}
