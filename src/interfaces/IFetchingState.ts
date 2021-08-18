import { IErrorDetail } from './IErrorDetail';

export interface IFetchingState<Response> {
  data?: Response;
  isFetching: boolean;
  isError: boolean;
  errorData?: IErrorDetail;
}
