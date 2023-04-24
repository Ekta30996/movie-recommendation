import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { RecommendComponent } from '../recommend/recommend.component';
import { FavoriteListComponent } from '../favorite-list/favorite-list.component';
import { WatchListComponent } from '../watch-list/watch-list.component';
import { LatestComponent } from '../latest/latest.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('container' , { read:ViewContainerRef }) container!: ViewContainerRef
  page!:string

  data: string = 'Hunnyuuuuu'
  pages = {
    home:'home',
    recommend:'recommend',
    favorite:'favorite',
    watch:'watch',
    latest:'latest'
  }
  
  onNameChange(data:any)
  {
    console.log(data);
  }
  ngOnInit(): void {
   
  }
  onCreateComponent(component:string){
    this.container.clear()
    const componentType = this.getComponentType(component)
    this.container.createComponent(componentType)
  }

  getComponentType(name:string):Type<string>{
    let type: Type<any> = HomeComponent
    switch(name){
      case this.pages.home:{
        type = HomePageComponent
        break
      }
      case this.pages.recommend:{
        type = RecommendComponent
        break
      }
      case this.pages.favorite:{
        type = FavoriteListComponent
        break
      }
      case this.pages.watch:{
        type = WatchListComponent
        break
      }
      case this.pages.latest:{
        type = LatestComponent
        break
      }
    }
    return type
  }
}
