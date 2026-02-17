import { delayForDevelopment } from './index.mock';
import { API_PATH } from '@/stores/querys/api-path';
import { HttpResponse, http } from 'msw';

export const schedulesHandler = [
  // 1. 기존 월별 일정 조회 핸들러
  http.get(`${API_PATH.schedules}`, ({ request }) => {
    const url = new URL(request.url);
    const year = Number(url.searchParams.get('year'));
    const month = Number(url.searchParams.get('month'));

    delayForDevelopment();
    const foundSchedule = schedulesData.find((item) => item.year === year && item.month === month);

    if (!foundSchedule) {
      return HttpResponse.json(
        {
          message: '해당 연도/월의 일정이 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      year: foundSchedule.year,
      month: foundSchedule.month,
      days: foundSchedule.days,
    });
  }),

  // 2. 특정 일자 일정 조회 핸들러
  http.get(`${API_PATH.schedules}/days`, ({ request }) => {
    const url = new URL(request.url);
    const year = Number(url.searchParams.get('year'));
    const month = Number(url.searchParams.get('month'));
    const day = Number(url.searchParams.get('day'));

    delayForDevelopment();

    const foundSchedule = schedulesData.find((item) => item.year === year && item.month === month);
    if (!foundSchedule) {
      return HttpResponse.json(
        {
          message: '해당 연도/월의 일정이 없습니다.',
        },
        { status: 404 },
      );
    }

    const foundDay = foundSchedule.days.find((item) => item.day === day);
    if (!foundDay) {
      return HttpResponse.json(
        {
          message: '해당 일자의 일정이 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      year: foundSchedule.year,
      month: foundSchedule.month,
      day: foundDay.day,
      events: foundDay.events,
    });
  }),

  // 3. 이벤트 상세 조회 핸들러
  http.get(`${API_PATH.schedules}/event/:eventId`, ({ params }) => {
    delayForDevelopment();
    const eventId = Number(params.eventId);

    let foundEvent = null;
    let foundEventDate = null;
    for (const schedule of schedulesData) {
      for (const dayInfo of schedule.days) {
        const event = dayInfo.events.find((ev) => ev.id === eventId);
        if (event) {
          foundEvent = event;
          const zeroPad = (num: number) => String(num).padStart(2, '0');
          foundEventDate = `${schedule.year}${zeroPad(schedule.month)}${zeroPad(dayInfo.day)}`;
          break;
        }
      }
      if (foundEvent) break;
    }

    if (!foundEvent) {
      return HttpResponse.json(
        {
          message: '해당 이벤트를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      id: foundEvent.id,
      name: foundEvent.name,
      date: foundEventDate,
      memo: foundEvent.memo,
      files: foundEvent.files ?? [],
    });
  }),
];

const schedulesData = [
  {
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
            files: [
              {
                id: 1,
                name: '정시 1차 발표 테스트 파일',
                path: '/event/어쩌구',
              },
            ],
          },
          {
            id: 2,
            name: '시무식',
            memo: '오전 10시 시작',
            files: [
              {
                id: 1,
                name: '정시 1차 발표 테스트 파일',
                path: '/event/어쩌구',
              },
            ],
          },
        ],
      },
      {
        day: 5,
        events: [
          {
            id: 3,
            name: '정시 1차 발표일',
            memo: "11시 공개 예정, '강건우','정용현'출근",
            files: [
              {
                id: 1,
                name: '정시 1차 발표 테스트 파일',
                path: '/event/어쩌구',
              },
            ],
          },
        ],
      },
    ],
  },
];
