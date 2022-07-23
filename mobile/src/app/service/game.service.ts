import { Injectable } from '@angular/core';
import { Game } from '../model/game.model';

// Firestore

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private angularFirestore: AngularFirestore) { }

  // CRUD
  getGames() {
    return this.angularFirestore
            .collection("games")
            .snapshotChanges()

  }
  getGameById(id: string) {
    return this.angularFirestore
            .collection("games")
            .doc(id )
            .valueChanges()
    
  }
  createGame(game: Game, callback: Function, onError: Function) {
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore
          .collection("games")
          .add(game)
          .then((response)=>{
            callback(response)
          },
          (error) => {
            onError(error)
          })
    });
  }
  updateGame(game: Game, id: string) {
    return this.angularFirestore
          .collection("games")
          .doc(id)
          .update({
            correct: game.correct,
            questions: game.questions,
            score: game.score,
            user: game.user,
            wrong: game.wrong
          })
  }
  deleteGame(game: Game){
    return this.angularFirestore
        .collection("games")
        .doc(game.id)
        .delete()
  }
}

