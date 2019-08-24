import { Observable } from "rxjs";
import { AjaxRequest, AjaxResponse, ajax } from "rxjs/ajax";


export const ACCESS_TOKEN_HEADER = 'spider-access-token';


export enum HTTPMethod {
    GET = "GET",
    POST = "POST"

}

export function sendRequest(url: string, method: HTTPMethod, authToken: string): Observable<AjaxResponse> {

    let request: AjaxRequest = {
        url,
        method,
        headers: {
            'spider-access-token': authToken
        }
    }
    return ajax(request)
}
