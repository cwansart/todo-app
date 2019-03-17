import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import moment from 'moment';
import { BackendSelectionService } from '../service/backend-selection.service';

@Component({
  templateUrl: './todo-edit.component.html',
})
export class TodoEditComponent implements OnInit {
  private id: number;
  public title: string;
  public description: string;
  public dueDate: string;
  public done: boolean;
  public lockForm = false;

  constructor(private service: BackendSelectionService, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.service.get(+params.get('id'))),
    ).subscribe(todo => {
      console.log('todo', todo);
      this.id = todo.id;
      this.title = todo.title;
      this.dueDate = moment(todo.dueDate).format('DD.MM.YYYY HH:mm');
      this.description = todo.description;
      this.done = todo.done;
    });
  }

  public onSubmit() {
    this.lockForm = true;
    this.service.put(this.id, {
      title: this.title,
      description: this.description,
      dueDate: moment(this.dueDate, ['DD.MM.YYYY', 'DD.MM.YYYY HH:mm']).toDate(),
      done: this.done,
    }).subscribe(() => {
      this.lockForm = false;
      this.router.navigate(['/todos', this.id]);
    });
  }
}
