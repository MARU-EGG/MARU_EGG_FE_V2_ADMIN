import { HttpResponse, http } from 'msw';

export const handler = [
  http.get('http://www.test.com/test', () => {
    console.log('here');
    return HttpResponse.json({
      success: true,
      message: '성공',
    });
  }),
];
