import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  public todos: Todo[];

  constructor(service: TodoService) {
    service.getAll().subscribe(todos => this.todos = todos);
  }
}
