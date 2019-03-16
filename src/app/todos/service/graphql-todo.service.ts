import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from '../todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlTodoService implements TodoService {
  public delete(id: number): Observable<boolean> {
    return undefined;
  }

  public get(id: number): Observable<Todo> {
    return of(null);
  }

  public getAll(): Observable<Todo[]> {
    return of(null);
  }

  public post(todo: Todo): Observable<Todo> {
    return of(null);
  }

  public put(id: number, changed: Todo): Observable<boolean> {
    return of(false);
  }
}
