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
import { TodoEditComponent } from './todos/edit/todo-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoAddComponent,
    TodoEditComponent,
    ErrorDirective,
    DateValidationDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({ uri: '/graphql-backend' }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
