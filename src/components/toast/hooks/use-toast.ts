'use client';

import { useSyncExternalStore } from 'react';
import { toastStore } from '../classes/toast-store';

export function useToast() {
  return useSyncExternalStore(
    toastStore.subscribe.bind(toastStore),
    toastStore.getSnapshot.bind(toastStore),
    toastStore.getSnapshot.bind(toastStore),
  );
}
