import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/table/index';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const tableData = [
  {
    question: '수시 전형 일정이 어떻게 되나요?',
    count: 20000,
    status: '미확인',
  },
  {
    question: '정시 원서접수 마감일이 언제인가요?',
    count: 18500,
    status: '미확인',
  },
  {
    question: '학생부종합전형 서류 제출 방법이 궁금합니다.',
    count: 15700,
    status: '미확인',
  },
  {
    question: '자기소개서 작성 팁을 알려주세요.',
    count: 32100,
    status: '미확인',
  },
  {
    question: '논술 전형 준비는 어떻게 하나요?',
    count: 27800,
    status: '미확인',
  },
  {
    question:
      '학교장 추전 전형에 대해 설명해줘 단 아래의 출력 형식을 반드시 따라줘 **(전형제목)** **(전형방법)** **(지.',
    count: 24300,
    status: '미확인',
  },
  {
    question: '면접 준비 방법을 알려주세요.',
    count: 29500,
    status: '미확인',
  },
  {
    question: '수능 최저학력기준이 어떻게 되나요?',
    count: 31200,
    status: '미확인',
  },
];

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell isHeader>질문 내용</TableCell>
          <TableCell isHeader>질문 횟수</TableCell>
          <TableCell isHeader>질문 확인 여부</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.question}</TableCell>
            <TableCell>{item.count}</TableCell>
            <TableCell>
              <button className={`h-7 w-14 rounded-md border border-error bg-error/10 text-sm text-error`}>
                {item.status}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const WithColumnWidths: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Table columnWidths={['60%', '20%', '20%']}>
      <TableHead>
        <TableRow>
          <TableCell isHeader>질문 내용</TableCell>
          <TableCell isHeader>질문 횟수</TableCell>
          <TableCell isHeader>질문 확인 여부</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.question}</TableCell>
            <TableCell>{item.count}</TableCell>
            <TableCell>
              <button className={`h-7 w-14 rounded-md border border-error bg-error/10 text-sm text-error`}>
                {item.status}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
