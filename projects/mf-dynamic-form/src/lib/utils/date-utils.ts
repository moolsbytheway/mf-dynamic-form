import { DatePipe } from "@angular/common";


export class DateUtils{
    public static HOUR_IN_MILLIS: number = 3600000;
    public static ISO_DATE_FORMAT: string = "yyyy-MM-dd'T'HH:mm";
    public static DEFAULT_TIMEZONE = "+00:00";

    public static getDateInTimeZone(dateTime: string | Date,timeZone: string,datePipe: DatePipe): string {
      if (!dateTime) return "";

      dateTime = dateTime instanceof Date ? dateTime.toISOString() : dateTime;

      if(!DateUtils.isDateContainsTimeZone(dateTime)){
        if(DateUtils.isDateContainsTimeZoneZ(dateTime)){
          dateTime = dateTime.replace("Z",DateUtils.DEFAULT_TIMEZONE);
        }else{
          dateTime += DateUtils.DEFAULT_TIMEZONE;
        }
      }

      if(!timeZone) timeZone = DateUtils.DEFAULT_TIMEZONE;
      const gap = DateUtils.getGapInMin(timeZone);
      let result = this.getDateByTimeZone(dateTime,gap);
      return datePipe.transform(result,DateUtils.ISO_DATE_FORMAT);
    }
    private static getDateByTimeZone(dateTime: string, gapWithGmt:number): Date{
      const referenceDate = new Date(dateTime);
      const offsetBtwLocalAndUtc = referenceDate.getTimezoneOffset() * DateUtils.HOUR_IN_MILLIS;

      return new Date(referenceDate.getTime() +( DateUtils.HOUR_IN_MILLIS * gapWithGmt + offsetBtwLocalAndUtc ) / 60);
    }

    private static isDateContainsTimeZone(dateTime: string): boolean{
      return dateTime?.charAt(dateTime.length-6)=="+" || dateTime?.charAt(dateTime.length-6)=="-";
    }
    private static getGapInMin(timeZone: string): number{
      const time = timeZone.split(":");
      const hoursToMinutes = Number(time[0]) * 60;
      const minutes = Number(time[1]);

      const negatifTimezoneGap = hoursToMinutes < 0;
      return hoursToMinutes + minutes  * (negatifTimezoneGap  ? -1 : 1);
    }
    private static isDateContainsTimeZoneZ(dateTime: string): boolean{
      return dateTime?.includes("Z");
    }
    public static getIsoDate(date: string): string{
      return new Date(date).toISOString().replace("Z","");
    }
}
