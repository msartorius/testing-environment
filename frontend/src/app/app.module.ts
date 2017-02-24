import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {APP_ROUTES} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {UserModule} from "./user/user.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {ToastModule} from "ng2-toastr";

import "chart.js";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UserModule,
    DashboardModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
