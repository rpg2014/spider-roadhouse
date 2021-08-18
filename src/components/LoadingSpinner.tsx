import React from 'react';
import { Spinner } from 'react-bootstrap';

type VariantType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
type SizeType = 'sm';
export interface ILoadingProps {
  variant?: VariantType;
  size?: SizeType;
}

export const LoadingSpinner = (props: ILoadingProps): JSX.Element => {
  if (!props.variant) {
    props.variant = 'secondary';
  }

  return (
    <div className="inner mb-auto my-3 text-center">
      <Spinner animation="border" variant={props.variant} size={props.size ? props.size : undefined} />
    </div>
  );
};

LoadingSpinner.defaultProps = {
  variant: 'secondary',
  size: undefined,
};
