import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from '../todo';
import { ConfigService } from './config.service';
import { GraphqlTodoService } from './graphql-todo.service';
import { RestTodoService } from './rest-todo.service';
import { TodoService } from './todo.service';
import { WebSocketTodoService } from './web-socket-todo.service';

const SERVICE_MAP: {[key: string]: any} = {
  rest: RestTodoService,
  graphql: GraphqlTodoService,
  websocket: WebSocketTodoService,
};

@Injectable({
  providedIn: 'root',
})
export class BackendSelectionService implements TodoService {
  private service: TodoService;

  constructor(injector: Injector, config: ConfigService, route: ActivatedRoute) {
    route.queryParamMap.subscribe(queryMap => {
      if (!queryMap.has('backendType') || !Object.keys(SERVICE_MAP).includes(queryMap.get('backendType').toLocaleLowerCase())) {
        console.log(`Loading default backend (${config.defaultBackend})`);
        this.service = injector.get(SERVICE_MAP[config.defaultBackend.toLowerCase()]);
      } else {
        const type = queryMap.get('backendType');
        console.log(`Loading ${type} backend`);
        this.service = injector.get(SERVICE_MAP[type.toLowerCase()]);
      }
    });
  }

  public delete(id: number): Observable<boolean> {
    return this.service.delete(id);
  }

  public get(id: number): Observable<Todo> {
    return this.service.get(id);
  }

  public getAll(): Observable<Todo[]> {
    return this.service.getAll();
  }

  public post(todo: Todo): Observable<Todo> {
    return this.service.post(todo);
  }

  public put(id: number, changed: Todo): Observable<boolean> {
    return this.service.put(id, changed);
  }
}
