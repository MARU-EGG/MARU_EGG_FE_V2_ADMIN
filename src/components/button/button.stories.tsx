import Button from '@/components/button/button';
import { Meta, StoryObj } from '@storybook/react';
import { describe } from 'node:test';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'text',
      description: 'primary / secondary / error 설정',
    },
    size: {
      control: 'text',
      description: 'large / small',
    },
    children: {
      control: 'text',
      description: '버튼 내부 콘텐츠',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const PrimaryLargetButton: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: '레이블',
  },
};

export const PrimarySmallButton: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: '레이블',
  },
};

export const SecondaryLargeButton: Story = {
  args: {
    variant: 'secondary',
    size: 'large',
    children: '레이블',
  },
};

export const SecondarySmallButton: Story = {
  args: {
    variant: 'secondary',
    size: 'small',
    children: '레이블',
  },
};

export const ErrorLargeButton: Story = {
  args: {
    variant: 'error',
    size: 'large',
    children: '레이블',
  },
};

export const ErrorSmallButton: Story = {
  args: {
    variant: 'error',
    size: 'small',
    children: '레이블',
  },
};
