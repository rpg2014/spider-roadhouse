import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse, ajax } from 'rxjs/ajax';

export const ACCESS_TOKEN_HEADER = 'spider-access-token';

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
}

export function sendRequest(url: string, method: HTTPMethod, authToken: string, body?: any): Observable<AjaxResponse> {
  let headers: any = {
    'spider-access-token': authToken
  }
  if (body || method === HTTPMethod.POST){
    headers['Content-Type'] = 'application/json'
  } else {
    headers['Content-Type'] = null
  }

  let request: AjaxRequest = {
    url,
    method,
    headers,
    body,
  };
  return ajax(request);
}
