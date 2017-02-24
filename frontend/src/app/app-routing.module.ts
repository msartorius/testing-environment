import { Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";

export const APP_ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard"
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

