import { Todo } from '../todo';
import { Observable } from 'rxjs';

export interface TodoService {
  getAll(): Observable<Todo[]>;
  get(id: number): Observable<Todo>;
  post(todo: Todo): Observable<Todo>;
  delete(id: number): Observable<boolean>;
  put(id: number, changed: Todo): Observable<boolean>;
}
