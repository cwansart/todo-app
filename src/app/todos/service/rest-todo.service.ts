import { Injectable } from '@angular/core';
import { Todo } from '../todo';
import { Observable, of, pipe } from 'rxjs';
import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestTodoService implements TodoService {
  constructor(private http: HttpClient, private config: ConfigService) {
  }

  public getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.config.restBackendUrl}/todos`).pipe(
      map(todos => todos || []),
    );
  }

  public get(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.config.restBackendUrl}/todos/${id}`);
  }

  public post(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.config.restBackendUrl}/todos`, {
      title: todo.title,
      description: todo.description || '',
      dueDate: todo.dueDate,
      done: todo.done,
    });
  }

  public delete(id: number): Observable<boolean> {
    return this.http.delete<null>(`${this.config.restBackendUrl}/todos/${id}`).pipe(
      pipe(() => of(true)),
      catchError((err) => {
        console.error('Could not delete todo', err);
        return of(false);
      }),
    );
  }

  public put(id: number, changed: Todo): Observable<boolean> {
    return this.http.put<null>(`${this.config.restBackendUrl}/todos/${id}`, {
      title: changed.title,
      description: changed.description || '',
      dueDate: changed.dueDate,
      done: changed.done
    }).pipe(
      pipe(() => of(true)),
      catchError((err) => {
        console.error('Could not update todo', err);
        return of(false);
      }),
    );
  }
}
