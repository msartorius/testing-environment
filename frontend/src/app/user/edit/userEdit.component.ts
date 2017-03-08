import {Component, OnInit, Input} from '@angular/core';
import {User} from "../model/user.model";
import {HttpService} from "../../shared/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-user',
  templateUrl: './userEdit.component.html',
  styleUrls: ['../user.component.scss']
})
export class UserEditComponent implements OnInit{

  private getUserByIdUrl: string = "users/";
  private pUDUrl: string = "user";

  @Input() private user: User = {
    id: undefined,
    firstname: "",
    familyname: "",
    email: "",
    timestamp: ""
  };

  constructor(private httpService: HttpService, private activatedRoute: ActivatedRoute,
              private router: Router, private toast: ToastsManager) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .map(params => params['id'])
      .filter(id => !!id)
      .take(1)
      .subscribe((id) => this.getUser(id));
  }

  getUser(id: string) {
    this.httpService.get<User>(this.getUserByIdUrl+id)
      .toPromise()
      .then(
        (data: any) => this.user = data,
        (err: any) => this.showError(err.toString())
      );
  }

  submitUser() {
    let postOrUpdate: Observable<User>;
    if(!!this.user.id) {
      postOrUpdate = this.httpService.put<User>(this.pUDUrl, this.user);
    } else {
      postOrUpdate = this.httpService.post<User>(this.pUDUrl, this.user)
    }
    postOrUpdate.toPromise()
      .then(
        () => {
          this.showSuccess("Nutzer erfolgreich angelegt");
          this.router.navigate(["/user"])
        },
        (err: any) => this.showError(err.toString())
      );
  }

  deleteUser(userId: string) {
    this.httpService.delete(this.pUDUrl, userId)
      .toPromise()
      .then(
        () => {
          this.showSuccess("Nutzer erfolgreich gelöscht");
          this.router.navigate(["/user"]);
        },
        (err: any) => this.showError(err.toString())
      );
  }

  validField(form: any, name: string) {
    if(name === 'email' && form.form.controls[name]) {
      return this.validateEmail(form.form.controls[name].value) ? form.form.controls[name].valid : false;
    }
    return form.form.controls[name] ? form.form.controls[name].valid : false;
  }

  validateEmail(email: string) {
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
  }

  private showError(error: string) {
    this.toast.error(error);
  }

  private showSuccess(succ: string) {
    this.toast.success(succ);
  }

}
