import DatePicker from '@/components/date-picker/date-picker';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

const meta = {
  title: 'Components/Date-Picker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const DatePickerWithState = (args: ComponentProps<typeof DatePicker>) => {
  const [date, setDate] = useState(args.value);

  return (
    <DatePicker
      {...args}
      value={date}
      onDateClick={(selectedDate) => {
        setDate(selectedDate);
        args.onDateClick?.(selectedDate);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <DatePickerWithState {...args} />,
  args: {
    label: '날짜를 선택해주세요.',
    value: null,
    onDateClick: (date) => action('date clicked')(date),
  },
};
