import Chip from './chip';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'text',
      description: 'error / success',
    },
    label: {
      control: 'text',
      description: '칩 내부 콘텐츠',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const ErrorChip: Story = {
  args: {
    status: 'error',
    label: '레이블',
  },
};

export const SuccessChip: Story = {
  args: {
    status: 'success',
    label: '레이블',
  },
};
