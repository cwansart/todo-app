import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  public todos: Observable<Todo[]>;

  constructor(service: TodoService) {
    this.todos = service.getAll();
  }
}
