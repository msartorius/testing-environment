import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import {DASHBOARD_ROUTE} from "./dashboard.route";
import {ChartsModule} from "ng2-charts/ng2-charts";
import { DatepickerModule } from 'ng2-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    DatepickerModule.forRoot(),
    RouterModule.forChild([DASHBOARD_ROUTE])
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [],
  exports: [RouterModule],
})
export class DashboardModule {
}
