import { API_PATH } from '@/stores/querys/api-path';
import { HttpResponse, http } from 'msw';

export const handler = [
  http.get('http://www.test.com/test', () => {
    console.log('here');
    return HttpResponse.json({
      success: true,
      message: '성공',
    });
  }),

  http.get(`${API_PATH.schedules}`, () => {
    console.log('msw 테스트값');
    return HttpResponse.json({
      year: 2025,
      month: 1,
      days: [
        {
          day: 1,
          events: [
            {
              id: 1,
              name: '신정',
              memo: '새해 복 많이 받으세요',
            },
            {
              id: 2,
              name: '시무식',
              memo: '오전 10시 시작',
            },
          ],
        },
        {
          day: 5,
          events: [
            {
              id: 3,
              name: '정시 1차 발표일',
              memo: '11시 공개 예정',
            },
          ],
        },
      ],
    });
  }),
];
