import { Component } from '@angular/core';
import { BackendSelectionService, BackendType } from './todos/service/backend-selection.service';

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
