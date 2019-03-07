import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todos/list/todo-list.component';
import { TodoDetailComponent } from './todos/detail/todo-detail.component';
import { TodoAddComponent } from './todos/add/todo-add.component';
import { FormsModule } from '@angular/forms';
import { DateValidationDirective } from './todos/validation/date-validation.directive';
import { ErrorDirective } from './todos/validation/error.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoAddComponent,
    ErrorDirective,
    DateValidationDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
