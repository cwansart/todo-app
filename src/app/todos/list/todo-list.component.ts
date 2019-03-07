import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  public todos: Observable<Todo[]>;

  constructor(private service: TodoService) {
  }

  public ngOnInit() {
    this.refreshTodos();
  }

  public delete(id: number) {
    this.service.delete(id).subscribe(() => this.refreshTodos());
  }

  private refreshTodos() {
    this.todos = this.service.getAll();
  }
}
