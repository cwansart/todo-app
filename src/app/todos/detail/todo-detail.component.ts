import { Component } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './todo-detail.component.html',
})
export class TodoDetailComponent {
  public todo: Observable<Todo>;

  constructor(service: TodoService, route: ActivatedRoute) {
    this.todo = route.paramMap.pipe(
      switchMap((params: ParamMap) => service.get(params.get('id'))),
    );
  }
}
