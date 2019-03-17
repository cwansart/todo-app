import { Injectable, Injector } from '@angular/core';
import { TodoService } from './todo.service';
import { RestTodoService } from './rest-todo.service';
import { GraphqlTodoService } from './graphql-todo.service';
import { Todo } from '../todo';
import { Observable } from 'rxjs';
import { BackendType, ConfigService } from './config.service';

// TODO: Solve this via router. /REST and /GraphQL route, loading the adequate service.

@Injectable({
  providedIn: 'root',
})
export class BackendSelectionService implements TodoService {
  private service: TodoService;

  constructor(private injector: Injector, config: ConfigService) {
    this.service = injector.get(config.defaultBackend === BackendType.Rest ? RestTodoService : GraphqlTodoService);
  }

  public setBackend(type: BackendType) {
    // tslint:disable-next-line:no-console
    console.info(`Settings backend to ${type === BackendType.Rest ? 'REST' : 'GraphQL'}`);
    this.service = this.injector.get(type === BackendType.Rest ? RestTodoService : GraphqlTodoService);
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
