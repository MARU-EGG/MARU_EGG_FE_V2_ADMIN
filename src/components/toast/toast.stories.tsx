import type { Meta, StoryObj } from '@storybook/react';
import { toast, ToastPosition, ToastType } from '@/components/toast';
import ToastProvider from './toast-provider';

function ToastDemo() {
  const types: ToastType[] = ['default', 'success', 'error'];
  const positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'middle-left',
    'middle-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  return (
    <div className="flex flex-col gap-6 p-8">
      <ToastProvider />

      <section>
        <h3 className="mb-3 text-sm font-semibold text-grayscale-gray-70">타입별 토스트</h3>
        <div className="flex gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() =>
                toast.open({
                  message: `${type} 메시지입니다.`,
                  type,
                  position: 'top-right',
                })
              }
              className="rounded border px-3 py-1.5 text-xs font-semibold"
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-grayscale-gray-70">포지션별 토스트</h3>
        <div className="grid grid-cols-3 gap-2">
          {positions.map((position) => (
            <button
              key={position}
              onClick={() =>
                toast.open({
                  message: position,
                  type: 'default',
                  position,
                })
              }
              className="rounded border px-3 py-1.5 text-xs font-semibold"
            >
              {position}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold text-grayscale-gray-70">duration 테스트</h3>
        <div className="flex gap-2">
          {[1000, 3000, 5000].map((duration) => (
            <button
              key={duration}
              onClick={() =>
                toast.open({
                  message: `${duration / 1000}초 후 사라짐`,
                  type: 'success',
                  position: 'bottom-right',
                  duration,
                })
              }
              className="rounded border px-3 py-1.5 text-xs font-semibold"
            >
              {duration / 1000}s
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof ToastDemo>;

export const Default: Story = {};
