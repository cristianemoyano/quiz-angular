import { Component, OnInit } from '@angular/core';
import { RankingService } from '../service/ranking.service';

import { Game } from '../game.model';
import { GameService } from '../game.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rankingList: any = [];
  Games: Game[]

  constructor(private rankingService : RankingService, private gameService: GameService) { }

  ngOnInit(): void {
    this.getRanking();
    this.gameService.getGames().subscribe((res)=>{
      this.Games = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Game)
        }
      });
      this.Games = _.filter(this.Games, function(game) { return game.score >0; });
      this.Games = _.sortBy(this.Games, ['score']).reverse().slice(0, 5);
    });
  }


  getRanking(){
    this.rankingService.getRankingJson()
    .subscribe(res=>{
      this.rankingList = res.ranking;
    })
  }

}
