import TextArea from './text-area';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const TextAreaVariant: Story = {
  args: {
    variant: 'textArea',
    placeHolder: '플레이스홀더',
  },
};

export const InputVariant: Story = {
  args: {
    variant: 'input',
    placeHolder: '플레이스홀더',
  },
};
