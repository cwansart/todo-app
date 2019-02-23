import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todos/list/todo-list.component';
import { TodoDetailComponent } from './todos/detail/todo-detail.component';

const routes: Routes = [
  {
    path: 'todos',
    children: [
      {
        path: ':id',
        component: TodoDetailComponent,
      },
      {
        path: '',
        component: TodoListComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
