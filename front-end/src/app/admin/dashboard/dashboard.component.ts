import { Component, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ListComponent } from '../listing/list/list.component';
import { HomeComponent } from '../home/home.component';
import { UploadComponent } from '../uploading/upload/upload.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  @ViewChild('container',{read:ViewContainerRef , static:true})
  container!:ViewContainerRef

  pages:any ={
    home:'home',
    list:'list',
    upload:'upload'
  }

  constructor(public router: Router){}
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
        type = HomeComponent
        break
      }
      case this.pages.list:{
        type = ListComponent
        break
      }
      case this.pages.upload:{
        type = UploadComponent
      }
      
    }
    return type
  }
}
