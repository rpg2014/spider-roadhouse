import { IErrorDetail } from "./IErrorDetail";


export interface IFetchingState<Type> {
    data?: Type,
    isFetching: boolean,
    isError: boolean,
    errorData?: IErrorDetail,
}