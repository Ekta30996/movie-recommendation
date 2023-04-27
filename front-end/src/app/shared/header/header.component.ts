import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @ViewChild('container' ,{read:ViewContainerRef , static:true}) container!: ViewContainerRef
  
  // pages = {
  //   home:'home',
  //   recommend:'recommend',
  //   favorite:'favorite',
  //   watch:'watch',
  //   latest:'latest'
  // }


  

  constructor(public _authService: AuthService,
    private router: Router){ }

  ngOnInit(): void { }


  
  
  // onCreateComponent(component:string){
  //   this.container.clear()
  //   const componentType = this.getComponentType(component)
  //   this.container.createComponent(componentType)
  // }

  // getComponentType(name:string):Type<string>{
  //   let type: Type<any> = HomePageComponent
  //   switch(name){
  //     case this.pages.home:{
  //       type = HomePageComponent
  //       break
  //     }
  //     case this.pages.recommend:{
  //       type = RecommendComponent
  //       break
  //     }
  //     case this.pages.favorite:{
  //       type = FavoriteListComponent
  //       break
  //     }
  //     case this.pages.watch:{
  //       type = WatchListComponent
  //       break
  //     }
  //     case this.pages.latest:{
  //       type = LatestComponent
  //       break
  //     }
  //   }
  //   return type
  // }

  
} 
