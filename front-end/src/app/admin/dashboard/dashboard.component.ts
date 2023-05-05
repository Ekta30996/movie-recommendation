import {
  Component,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { ListComponent } from "../listing/list/list.component";
import { UploadComponent } from "../uploading/upload/upload.component";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth/auth.service";
import { ProfileComponent } from "src/app/user/profile/profile.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  isAdmin: boolean = false;
  pages: any = {
    list: "list",
    upload: "upload",
    profile: "profile",
  };

  constructor(public router: Router, public _authService: AuthService) {}

  ngOnInit(): void {
  }

  onCreateComponent(component: string) {
    this.container.clear();
    const componentType = this.getComponentType(component);
    this.container.createComponent(componentType);
  }

  getComponentType(name: string): Type<string> {
    let type: Type<any> = ListComponent;
    switch (name) {
      case this.pages.list: {
        type = ListComponent;
        break;
      }
      case this.pages.upload: {
        type = UploadComponent;
        break;
      }
      case this.pages.profile: {
        type = ProfileComponent;
        this.isAdmin = true;
      }
    }
    return type;
  }
}
