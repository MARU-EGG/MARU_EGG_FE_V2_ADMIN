import { ToastItem, ToastItemData } from './toast-item';
import { ToastQueue } from './toast-queue';
import { ToastTimer } from './toast-timer';

export class ToastStore {
  private listeners = new Set<() => void>();
  private queue = new ToastQueue();
  private timer = new ToastTimer();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getSnapshot(): ToastItemData[] {
    return this.queue.getSnapshot();
  }

  open(options: Omit<ToastItemData, 'id'>): void {
    const item = new ToastItem(options);
    this.queue.add(item);
    this.timer.start(item.id, item.duration, () => this.close(item.id));
    this.notify();
  }

  close(id: string): void {
    this.queue.remove(id);
    this.timer.cancel(id);
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export const toastStore = new ToastStore();
