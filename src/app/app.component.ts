import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from './todos/service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isSseAvailable: boolean;

  constructor(route: ActivatedRoute) {
    route.queryParamMap.subscribe(queryMap => {
      const type = queryMap.get('backendType');
      this.isSseAvailable = type === 'rest' || type === 'graphql';
    });
  }
}
