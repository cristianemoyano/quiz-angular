import { Component, OnInit } from '@angular/core';
import { RankingService } from '../service/ranking.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rankingList: any = [];

  constructor(private rankingService : RankingService) { }

  ngOnInit(): void {
    this.getRanking();
  }

  getRanking(){
    this.rankingService.getRankingJson()
    .subscribe(res=>{
      this.rankingList = res.ranking;
    })
  }

}
