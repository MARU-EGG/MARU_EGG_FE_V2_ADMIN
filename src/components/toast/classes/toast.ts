import { ToastPosition, ToastType } from './toast-item';
import { ToastStore, toastStore } from './toast-store';

export type ToastOpenOptions = {
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
};

class Toast {
  constructor(private store: ToastStore) {}

  open(options: ToastOpenOptions): void {
    this.store.open({
      message: options.message,
      type: options.type ?? 'default',
      position: options.position ?? 'top-right',
      duration: options.duration ?? 3000,
    });
  }
}

export const toast = new Toast(toastStore);
