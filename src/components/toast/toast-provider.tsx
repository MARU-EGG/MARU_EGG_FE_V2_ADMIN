'use client';

import { ToastPosition } from './classes/toast-item';
import ToastContainer from './toast-container';

const POSITIONS: ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'middle-left',
  'middle-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

function ToastProvider() {
  return (
    <>
      {POSITIONS.map((position) => (
        <ToastContainer key={position} position={position} />
      ))}
    </>
  );
}

export default ToastProvider;
