import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {USER_ROUTE} from "./user.route";
import {UserEditComponent} from "./edit/userEdit.component";
import {NgModule} from "@angular/core";
import {UserSearchComponent} from "./search/userSearch.component";
import {UserComponent} from "./user.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([USER_ROUTE])
  ],
  declarations: [
    UserComponent,
    UserEditComponent,
    UserSearchComponent
  ],
  providers: [UserComponent, UserEditComponent, UserSearchComponent],
  exports: [RouterModule],
})
export class UserModule {
}
