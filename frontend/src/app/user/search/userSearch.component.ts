import {Component, OnInit} from "@angular/core";
import {HttpService} from "../../shared/http.service";
import {User} from "../model/user.model";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: "app-user",
  templateUrl: "./userSearch.component.html",
  styleUrls: ["../user.component.scss"]
})
export class UserSearchComponent implements OnInit {

  private getAllUsersUrl: string = "users";
  private users: User[];

  constructor(private httpService: HttpService, private router: Router, private toast: ToastsManager) {
  }

  ngOnInit(): void {
    this.httpService
      .get<User>(this.getAllUsersUrl)
      .toPromise()
      .then(
        (data: any) => this.users = data,
        (err: any) => this.showError(err.toString())
      );
  }

  editUser(user: User) {
    this.router.navigate(["/user/edit", user.id]);
  }

  private showError(error: string) {
    this.toast.error(error);
  }

}
