import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';

const MOCK_TODOS: Todo[] = [
  {
    title: 'Test1',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    dueDate: new Date('2019-01-01'),
    done: false,
  },
  {
    title: 'Test2',
    description: 'labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores',
    dueDate: new Date(),
    done: true,
  },
  {
    title: 'Test3',
    description: 'et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    dueDate: new Date('2019-12-31'),
    done: false,
  },
];

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public getAll(): Observable<Todo[]> {
    return of(MOCK_TODOS);
  }
}
