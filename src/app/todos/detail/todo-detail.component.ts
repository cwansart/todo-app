import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { RestTodoService } from '../service/rest-todo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './todo-detail.component.html',
})
export class TodoDetailComponent implements OnInit {
  public todo: Observable<Todo>;

  constructor(private service: RestTodoService, private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.todo = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.get(+params.get('id'))),
    );
  }
}
