import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BackendType, ConfigService } from '../service/config.service';
import { ActivatedRoute } from '@angular/router';

enum MessageType {
  Create = 'CREATE',
  Delete = 'DELETE',
  Update = 'UPDATE',
}

interface Message {
  readonly type: MessageType;
  readonly message: any;
}

@Component({
  selector: 'app-sse-box',
  templateUrl: './sse-box.component.html',
})
export class SseBoxComponent implements OnInit, OnDestroy {
  private sseUrl: string;
  private subscription: Subscription;
  public events: Observable<Message[]>;

  constructor(injector: Injector, config: ConfigService, route: ActivatedRoute) {
    route.queryParamMap.subscribe(queryMap => {
      if (!queryMap.has('backendType')) {
        this.sseUrl = config.defaultBackend === BackendType.Rest ? config.restSseUrl : config.graphqlSseUrl;
      } else {
        const type = queryMap.get('backendType');
        this.sseUrl = type === 'rest' ? config.restSseUrl : config.graphqlSseUrl;
      }
    });
  }

  public ngOnInit() {
    this.events = new Observable<Message[]>(subscriber => {
      const eventCache = [];
      const handleMessage = (message: Message) => {
        eventCache.push(message);
        subscriber.next(eventCache);
      };

      const source = new EventSource(this.sseUrl);
      source.addEventListener('Todo created', (e: MessageEvent) => handleMessage({
        type: MessageType.Create,
        message: JSON.parse(e.data),
      }));
      source.addEventListener('Todo deleted', (e: MessageEvent) => handleMessage({
        type: MessageType.Delete,
        message: JSON.parse(e.data),
      }));
      source.addEventListener('Todo updated', (e: MessageEvent) => handleMessage({
        type: MessageType.Update,
        message: JSON.parse(e.data),
      }));

      return () => {
        source.close();
      };
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
