import {Component} from "@angular/core";

@Component({
  selector: "app-user",
  template: `<section class="page">

        <h3>User Dashboard</h3>
        <hr>
        <router-outlet></router-outlet>
        
     </section>
  `
})
export class UserComponent {
}
