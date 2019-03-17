import { Component } from '@angular/core';
import { BackendSelectionService } from './todos/service/backend-selection.service';
import { BackendType } from './todos/service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private service: BackendSelectionService) {
  }

  public setRestBackend() {
    this.service.setBackend(BackendType.Rest);
  }

  public setGraphqlBackend() {
    this.service.setBackend(BackendType.Graphql);
  }
}
