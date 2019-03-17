import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly restBackendUrl = 'http://localhost:8080/todo-list-rest/api';
  public readonly graphqlBackendUrl = 'http://localhost:8081/todo-list-graphql/';
}
