import Selector from '.';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Selector',
  component: Selector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Selector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallType: Story = {
  args: {
    children: null,
    selectorSize: 'small',
  },
  render: () => (
    <Selector>
      <Selector.Trigger placeholder="타입선택" />
      <Selector.Menus>
        <Selector.Menu value="SUSI" label="수시" onClick={action('수시 clicked')} />
        <Selector.Menu value="JEONGSI" label="정시" onClick={action('정시clicked')} />
        <Selector.Menu value="PYEONIP" label="편입" onClick={action('편입 clicked')} />
      </Selector.Menus>
    </Selector>
  ),
};

export const LargeType: Story = {
  args: {
    children: null,
    selectorSize: 'large',
  },
  render: () => (
    <Selector>
      <Selector.Trigger placeholder="타입선택" />
      <Selector.Menus>
        <Selector.Menu value="SUSI" label="수시" onClick={action('수시 clicked')} />
        <Selector.Menu value="JEONGSI" label="정시" onClick={action('정시clicked')} />
        <Selector.Menu value="PYEONIP" label="편입" onClick={action('편입 clicked')} />
      </Selector.Menus>
    </Selector>
  ),
};

export const SmallCategory: Story = {
  args: {
    children: null,
    selectorSize: 'large',
  },
  render: () => (
    <Selector>
      <Selector.Trigger placeholder="카테고리선택" />
      <Selector.Menus>
        <Selector.Menu value="ADMISSION_GUIDELINE" label="모집요강" onClick={action('모집요강')} />
        <Selector.Menu value="PASSING_RESULT" label="입시결과" onClick={action('입시결과')} />
        <Selector.Menu value="PAST_QUESTIONS" label="기출문제" onClick={action('기출문제')} />
        <Selector.Menu value="INTERVIEW_INFO" label="면접유의사항" onClick={action('면접유의사항')} />
      </Selector.Menus>
    </Selector>
  ),
};

export const LargeCategory: Story = {
  args: {
    children: null,
    selectorSize: 'large',
  },
  render: () => (
    <Selector>
      <Selector.Trigger placeholder="카테고리선택" />
      <Selector.Menus>
        <Selector.Menu value="ADMISSION_GUIDELINE" label="모집요강" onClick={action('모집요강')} />
        <Selector.Menu value="PASSING_RESULT" label="입시결과" onClick={action('입시결과')} />
        <Selector.Menu value="PAST_QUESTIONS" label="기출문제" onClick={action('기출문제')} />
        <Selector.Menu value="INTERVIEW_INFO" label="면접유의사항" onClick={action('면접유의사항')} />
      </Selector.Menus>
    </Selector>
  ),
};
