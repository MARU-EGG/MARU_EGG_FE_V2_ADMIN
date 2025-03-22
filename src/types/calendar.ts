export type CalendarDay = {
  date: string;
  year: string;
  month: string;
  day: string;
  dayOfWeek: number;
};

export type DateInfo = {
  year: string;
  month: string;
  day: string;
  lastDayOfMonth: string;
};

export type RestDayItem = {
  dateKind: string;
  dateName: string;
  isHoliday: 'Y' | 'N';
  locdate: number;
  seq: number;
};

type RestDayItemsContainer = {
  item: RestDayItem[];
};

export type RestDayResponse = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: RestDayItemsContainer;
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
};
