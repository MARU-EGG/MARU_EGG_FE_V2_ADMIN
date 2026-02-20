import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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

// 지정한 ms만큼 기다리는 mock API 유틸
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const mockApi = {
  success: () => delay(1500),
  fail: () =>
    delay(1000).then(() => {
      throw new Error('서버 오류');
    }),
};

function AsyncDemo() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = (key: string, value: boolean) =>
    setLoadingStates((prev) => ({ ...prev, [key]: value }));

  // 성공 케이스
  const handleSave = async () => {
    setLoading('save', true);
    try {
      await mockApi.success();
      toast.open({ message: '저장되었습니다.', type: 'success', position: 'top-right' });
    } catch {
      toast.open({ message: '저장에 실패했습니다.', type: 'error', position: 'top-right' });
    } finally {
      setLoading('save', false);
    }
  };

  // 실패 케이스
  const handleDelete = async () => {
    setLoading('delete', true);
    try {
      await mockApi.fail();
      toast.open({ message: '삭제되었습니다.', type: 'success', position: 'top-right' });
    } catch {
      toast.open({ message: '삭제에 실패했습니다.', type: 'error', position: 'top-right' });
    } finally {
      setLoading('delete', false);
    }
  };

  // 연속 요청 케이스 (순서대로 3개)
  const handleSequential = async () => {
    setLoading('seq', true);
    try {
      await mockApi.success();
      toast.open({ message: '1단계 완료', type: 'success', position: 'top-center' });

      await mockApi.success();
      toast.open({ message: '2단계 완료', type: 'success', position: 'top-center' });

      await mockApi.success();
      toast.open({ message: '모든 단계 완료!', type: 'success', position: 'top-center' });
    } catch {
      toast.open({ message: '처리 중 오류 발생', type: 'error', position: 'top-center' });
    } finally {
      setLoading('seq', false);
    }
  };

  // 병렬 요청 케이스 (동시에 여러 개)
  const handleParallel = async () => {
    setLoading('parallel', true);
    const results = await Promise.allSettled([
      mockApi.success(),
      mockApi.fail(),
      mockApi.success(),
    ]);

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        toast.open({
          message: `요청 ${index + 1} 성공`,
          type: 'success',
          position: 'bottom-right',
          duration: 4000,
        });
      } else {
        toast.open({
          message: `요청 ${index + 1} 실패`,
          type: 'error',
          position: 'bottom-right',
          duration: 4000,
        });
      }
    });

    setLoading('parallel', false);
  };

  const btnBase =
    'rounded border px-3 py-1.5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="flex flex-col gap-6 p-8">
      <ToastProvider />

      <section>
        <h3 className="mb-1 text-sm font-semibold text-grayscale-gray-70">
          비동기 성공 / 실패
        </h3>
        <p className="mb-3 text-xs text-grayscale-gray-50">
          버튼 클릭 시 로딩 → 결과 토스트 (실제 fetch와 동일한 패턴)
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={loadingStates.save}
            className={btnBase}
          >
            {loadingStates.save ? '저장 중…' : '저장 (성공)'}
          </button>
          <button
            onClick={handleDelete}
            disabled={loadingStates.delete}
            className={btnBase}
          >
            {loadingStates.delete ? '삭제 중…' : '삭제 (실패)'}
          </button>
        </div>
      </section>

      <section>
        <h3 className="mb-1 text-sm font-semibold text-grayscale-gray-70">
          연속 요청 (Sequential)
        </h3>
        <p className="mb-3 text-xs text-grayscale-gray-50">
          3단계 비동기 작업을 순서대로 실행 — 각 단계마다 토스트
        </p>
        <button
          onClick={handleSequential}
          disabled={loadingStates.seq}
          className={btnBase}
        >
          {loadingStates.seq ? '처리 중…' : '순차 실행'}
        </button>
      </section>

      <section>
        <h3 className="mb-1 text-sm font-semibold text-grayscale-gray-70">
          병렬 요청 (Parallel — Promise.allSettled)
        </h3>
        <p className="mb-3 text-xs text-grayscale-gray-50">
          3개 요청 동시 실행, 각 결과를 개별 토스트로 표시 (성공 2개 + 실패 1개)
        </p>
        <button
          onClick={handleParallel}
          disabled={loadingStates.parallel}
          className={btnBase}
        >
          {loadingStates.parallel ? '요청 중…' : '병렬 실행'}
        </button>
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

export const Async: StoryObj<typeof AsyncDemo> = {
  render: () => <AsyncDemo />,
};
