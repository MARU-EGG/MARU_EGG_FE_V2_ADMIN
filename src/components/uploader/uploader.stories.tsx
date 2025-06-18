import Uploader from '.';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Uploader',
  component: Uploader,
} satisfies Meta<typeof Uploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Uploader.Button />
        <Uploader.Lists />
      </>
    ),
  },
  render: (args) => <Uploader {...args} />,
};
