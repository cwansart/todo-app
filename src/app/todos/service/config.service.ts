import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public readonly restBackendUrl = 'http://localhost:8080/api';
  public readonly graphqlBackendUrl = 'http://localhost:8080/graphql';
}
