export class ToastTimer {
  private timers = new Map<string, ReturnType<typeof setTimeout>>();

  start(id: string, duration: number, onExpire: () => void): void {
    this.cancel(id);
    const timer = setTimeout(onExpire, duration);
    this.timers.set(id, timer);
  }

  cancel(id: string): void {
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }

  cancelAll(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
  }
}
