import React from 'react';
import { IErrorDetail } from '../../../interfaces/IErrorDetail';

interface ErrorProps {
  errorDetail: IErrorDetail;
}

export const ErrorAlert: React.FC<ErrorProps> = (props: ErrorProps) => {
  return <div className="alert alert-danger max_width mx-auto">{props.errorDetail.errorMessage}</div>;
};
