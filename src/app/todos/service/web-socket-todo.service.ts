import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Todo } from '../todo';
import { ConfigService } from './config.service';
import { TodoService } from './todo.service';
import moment from 'moment';

enum TodoMessageType {
  Create = 'CREATE_TODO',
  Delete = 'DELETE_TODO',
  Get = 'GET_TODO',
  GetAll = 'GET_TODOS',
  Update = 'UPDATE_TODO',
}

enum ResponseType {
  Create = 'CREATE_TODO_RESPONE',
  Get = 'GET_TODO_RESPONSE',
  GetAll = 'GET_TODOS_RESPONSE',
}

interface TodoMessage {
  readonly type: TodoMessageType | ResponseType;
  readonly data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class WebSocketTodoService implements TodoService {
  private socketObserver: Observable<any>;
  private messageQueue = new BehaviorSubject<TodoMessage | null>(null);
  private isSocketOpen = new BehaviorSubject<boolean>(false);

  private getAllQueue = new Subject<Todo[]>();
  private getQueue = new Subject<Todo>();
  private postQueue = new Subject<Todo>();

  constructor(config: ConfigService) {
    this.socketObserver = new Observable(observer => {
      const socket = new WebSocket(config.websocketBackendUrl);

      socket.onmessage = message => observer.next(JSON.parse(message.data));

      socket.onopen = () => {
        console.log('Socket opened');

        this.isSocketOpen.next(true);

        this.messageQueue.subscribe((message: TodoMessage) => {
          console.log('Sending message via WebSocket', message);
          socket.send(JSON.stringify(message));
        });
      };

      socket.onclose = event => {
        console.log('Socket closed', event);
        this.isSocketOpen.next(false);
        observer.complete();
      };

      return {
        unsubscribe() {
          socket.close();
        },
      };
    });

    this.socketObserver.subscribe((message: TodoMessage) => {
      console.log('Received messages', message);

      switch (message.type) {
        case ResponseType.GetAll:
          this.getAllQueue.next(message.data);
          break;

        case ResponseType.Get:
          this.getQueue.next(message.data);
          break;

        case ResponseType.Create:
          this.postQueue.next(message.data);
          break;
      }
    });
  }

  public getAll(): Observable<Todo[]> {
    console.log(`Calling WebSocketTodoService.getAll`);
    this.messageQueue.next({ type: TodoMessageType.GetAll });
    return this.getAllQueue.asObservable();
  }

  public get(id: number): Observable<Todo> {
    console.log(`Calling WebSocketTodoService.get with id ${id}`);
    this.messageQueue.next({ type: TodoMessageType.Get, data: { id } });
    return this.getQueue.asObservable();
  }

  public post(todo: Todo): Observable<Todo> {
    const newTodo = {
      type: TodoMessageType.Create, data: {
        ...todo,
        dueDate: moment(todo.dueDate).format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
      }
    };
    console.log(`Calling WebSocketTodoService.post with todo`, newTodo);
    this.messageQueue.next(newTodo);
    return this.postQueue.asObservable();
  }

  public delete(id: number): Observable<boolean> {
    console.log(`Calling WebSocketTodoService.delete with id ${id}`);
    this.messageQueue.next({ type: TodoMessageType.Delete, data: { id } });
    return of(true);
  }

  public put(id: number, changed: Todo): Observable<boolean> {
    const todo = {
      type: TodoMessageType.Update, data: {
        ...changed,
        id,
        dueDate: moment(changed.dueDate).format('YYYY-MM-DD[T]HH:mm:ss[Z]'),
      }
    };
    console.log(`Calling WebSocketTodoService.put with id ${id} and todo`, todo);
    this.messageQueue.next(todo);
    return of(true);
  }
}
