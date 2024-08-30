declare module 'moment-jalaali' {
    import { Moment } from 'moment';
    namespace momentJalaali {
      function loadPersian(options?: { dialect?: 'persian-modern'; usePersianDigits?: boolean }): void;
      function jalaaliToDate(jy: number, jm: number, jd: number): Date;
      function dateToJalaali(date: Date): { jy: number; jm: number; jd: number };
      function jIsLeapYear(jy: number): boolean;
      function jDaysInMonth(jy: number, jm: number): number;
      function jNow(): Moment;
    }
    export = momentJalaali;
    export as namespace momentJalaali;
  }
  