import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game.model';
import { GameService } from '../service/game.service';
import { RankingService } from '../service/ranking.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public rankingList: any = [];
  Games: Game[]

  constructor(private rankingService : RankingService, private gameService: GameService) { }

  ngOnInit(): void {
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



}
