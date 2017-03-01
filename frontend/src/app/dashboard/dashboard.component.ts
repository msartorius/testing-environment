import {Component, OnInit} from '@angular/core';
import * as moment from "moment"
import {DateRange} from "./model/date-range.model";
import {HttpService} from "../shared/http.service";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import * as _ from "lodash";
import Moment = moment.Moment;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private httpService: HttpService, private toast: ToastsManager) {}

  private dateRange: DateRange = {
    startDate: undefined,
    endDate: undefined
  };

  // datepicker
  private dt: Date = new Date();
  private minDate: Date = void 0;
  private minMode: string = "month";

  // lineChart
  private lineChartData:Array<any> = [
    {data: [], label: 'Nutzer Registrierungen'}
  ];
  private lCDCopy:Array<any> = [
    {data: [], label: 'Nutzer Registrierungen'}
  ];
  private lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  private lineChartOptions:any = {
    responsive: true,
    scales: {
      yAxes: [{
        stacked: true,
        ticks: {
          min: 0,
          stepSize: 1,
        }
      }]
    }
  };
  private lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  private lineChartLegend:boolean = true;
  private lineChartType:string = 'line';

  ngOnInit(): void {
    this.lineChartData = [...this.lineChartData];
    this.lineChartData[0].data = _.times(moment(this.dt).daysInMonth() + 1, _.constant(0));
    this.changeDate();
  }

  changeDate() {
    this.lineChartLabels = _.range(1, moment(this.dt).daysInMonth() + 1);
    let m = moment(this.dt).utcOffset(0, true);
    this.dateRange.startDate = m.clone().startOf("month").toISOString();
    this.dateRange.endDate = m.clone().endOf("month").toISOString();
    this.postRequest();
  }

  private postRequest() {
    this.httpService.post<DateRange>("dashboard", this.dateRange).toPromise()
      .then(
        (data: any) => this.mergeMapToArray(data),
        (err: any) => this.showError(err.toString())
      );
  }

  private getMonthArray(mom: Moment): Array<number> {
    let dim = mom.daysInMonth();
    return _.times(dim, _.constant(0));
  }

  private mergeMapToArray(map: {[key: number]: number}) {
    let month = this.getMonthArray(moment(this.dt));
    for(var day in map) {
      if (map.hasOwnProperty(day)) {
        month[Number(day) - 1] = map[day];
      }
    }
    this.lineChartData = [...this.lineChartData];
    this.lineChartData[0].data = month;
  }

  private showError(error: string) {
    this.toast.error(error);
  }

}
