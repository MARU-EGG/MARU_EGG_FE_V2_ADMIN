import Calendar from '@/components/calendar/calendar';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDateClick: (date) => action('date clicked')(date),
    restDays: { '2025-3-01': ['삼일절'], '2025-3-03': ['대체 공휴일'] },
    events: { '2025-3-03': ['테스트 이벤트'], '2025-3-04': ['테스트 이벤트'] },
  },
};
