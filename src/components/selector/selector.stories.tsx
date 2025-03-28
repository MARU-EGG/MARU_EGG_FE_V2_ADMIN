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
      <Selector.Trigger>전형선택</Selector.Trigger>
      <Selector.Menus>
        <Selector.Menu onClick={action('수시 clicked')}>수시</Selector.Menu>
        <Selector.Menu onClick={action('정시clicked')}>정시</Selector.Menu>
        <Selector.Menu onClick={action('편입 clicked')}>편입</Selector.Menu>
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
      <Selector.Trigger>전형선택</Selector.Trigger>
      <Selector.Menus>
        <Selector.Menu onClick={action('수시 clicked')}>수시</Selector.Menu>
        <Selector.Menu onClick={action('정시clicked')}>정시</Selector.Menu>
        <Selector.Menu onClick={action('편입 clicked')}>편입</Selector.Menu>
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
      <Selector.Trigger>카테고리 선택</Selector.Trigger>
      <Selector.Menus>
        <Selector.Menu onClick={action('모집요강')}>모집요강</Selector.Menu>
        <Selector.Menu onClick={action('입시결과')}>입시결과</Selector.Menu>
        <Selector.Menu onClick={action('기출문제')}>기출문제</Selector.Menu>
        <Selector.Menu onClick={action('면접유의사항')}>면접유의사항</Selector.Menu>
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
      <Selector.Trigger>카테고리 선택</Selector.Trigger>
      <Selector.Menus>
        <Selector.Menu onClick={action('모집요강')}>모집요강</Selector.Menu>
        <Selector.Menu onClick={action('입시결과')}>입시결과</Selector.Menu>
        <Selector.Menu onClick={action('기출문제')}>기출문제</Selector.Menu>
        <Selector.Menu onClick={action('면접유의사항')}>면접유의사항</Selector.Menu>
      </Selector.Menus>
    </Selector>
  ),
};
