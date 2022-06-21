import { Component, OnInit } from '@angular/core';
import { RankingService } from '../service/ranking.service';

import { Game } from '../game.model';
import { GameService } from '../game.service';

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
    });
  }


  getRanking(){
    this.rankingService.getRankingJson()
    .subscribe(res=>{
      this.rankingList = res.ranking;
    })
  }

}
