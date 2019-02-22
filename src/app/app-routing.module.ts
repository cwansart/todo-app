import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todos/list/todo-list.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoListComponent,
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
