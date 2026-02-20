import { ToastItemData } from './toast-item';

export class ToastQueue {
  private items: ToastItemData[] = [];

  add(item: ToastItemData): void {
    this.items = [...this.items, item];
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getSnapshot(): ToastItemData[] {
    return this.items;
  }
}
