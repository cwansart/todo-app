import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';

let TODOS: Todo[] = [
  {
    id: 1,
    title: 'Test1',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut',
    dueDate: new Date('2019-01-01'),
    done: false,
  },
  {
    id: 2,
    title: 'Test2',
    description: 'labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores',
    dueDate: new Date(),
    done: true,
  },
  {
    id: 3,
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
    return of(TODOS);
  }

  public get(id: number): Observable<Todo> {
    return of(TODOS[id - 1]);
  }

  public post(todo: Todo): Observable<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: TODOS.length ? TODOS[TODOS.length - 1].id + 1 : 1,
    };
    TODOS.push(newTodo);
    return of(newTodo);
  }

  public delete(id: number): Observable<boolean> {
    const found = TODOS.find(todo => todo.id === id) !== undefined;
    TODOS = TODOS.filter(todo => todo.id !== id);
    return of(found);
  }

  public put(id: number, changed: Todo): Observable<boolean> {
    if (TODOS.find(todo => todo.id === id) !== undefined) {
      const listWithoutCurrent = TODOS.filter(todo => todo.id !== id);
      TODOS = [
        ...listWithoutCurrent,
        {
          id,
          ...changed,
        },
      ].sort((a, b) => a.id - b.id);
      return of(true);
    }
    return of(false);
  }
}
