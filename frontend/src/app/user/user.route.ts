import {Route} from "@angular/router";
import {UserEditComponent} from "./edit/userEdit.component";
import {UserComponent} from "./user.component";
import {UserSearchComponent} from "./search/userSearch.component";

export const USER_ROUTE: Route = {
  path: "user",
  component: UserComponent,
  children: [
    {
      path: "",
      component: UserSearchComponent
    },
    {
      path: "new",
      component: UserEditComponent
    },
    {
      path: "edit/:id",
      component: UserEditComponent
    }
  ]
};
