import { Injectable } from '@angular/core';

export enum BackendType {
  Rest = 'REST',
  Graphql = 'GraphQL',
  WebSocket = 'WebSocket'
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly restSseUrl = 'http://localhost:8080/todo-list-rest/api/todos/all/events';
  public readonly restBackendUrl = 'http://localhost:8080/todo-list-rest/api';

  public readonly graphqlSseUrl = 'http://localhost:8081/todo-list-graphql/api/todos/all/events';
  public readonly graphqlBackendUrl = 'http://localhost:8081/todo-list-graphql/graphql';

  public readonly websocketBackendUrl = 'ws://localhost:8082/todo-list-websocket/todos';

  public readonly defaultBackend: BackendType = BackendType.WebSocket;
}
