export type ToastType = 'success' | 'error' | 'default';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastItemData {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;
}

export class ToastItem implements ToastItemData {
  id: string;
  message: string;
  type: ToastType;
  position: ToastPosition;
  duration: number;

  constructor(options: Omit<ToastItemData, 'id'>) {
    this.id = crypto.randomUUID();
    this.message = options.message;
    this.type = options.type;
    this.position = options.position;
    this.duration = options.duration;
  }
}
