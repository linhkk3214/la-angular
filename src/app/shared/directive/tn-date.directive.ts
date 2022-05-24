import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tnDate'
})
export class TnDatePipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe
  ) {

  }
  addZero(value) {
    if (value < 10) {
      return `0${value}`;
    }
    return value.toString();
  }
  transform(value: any, dataType: string, format: 'normal' | 'fromNow' = 'fromNow', args?: any): any {
    if (dataType == 'date') return this.renderDate(value, format);
    return this.renderDateTime(value, format);
  }

  private renderDateTime(datetime, format: 'normal' | 'fromNow' = 'fromNow') {
    if (!datetime) {
      return '';
    }
    if (typeof datetime === 'string') {
      datetime = new Date(datetime + '');
    }

    if (format === 'normal') {
      return this.datePipe.transform(datetime, 'dd/MM/yyyy HH:mm');
    }

    const now: any = new Date();
    let milisecond = now - datetime;
    if (milisecond > 0) {
      if (milisecond < 30000) {
        // 30 giây
        return 'Vài giây trước';
      }
      if (milisecond >= 30000 && milisecond < 90000) {
        // 30 giây - 90 giây
        return 'Một phút trước';
      }
      if (milisecond < 300000) {
        // 5 phút
        return 'Vài phút trước';
      }
      if (milisecond >= 300000 && milisecond < 3600000) {
        // dưới 1 tiếng
        return Math.ceil(milisecond / 60000) + ' phút trước';
      }
      if (milisecond >= 3600000 && milisecond < 18000000) {
        // dưới 5 tiếng
        return 'Vài giờ trước';
      }
      if (milisecond >= 18000000 && milisecond < 86400000) {
        // dưới 1 ngày
        if (datetime.getDate() == now.getDate()) {
          return Math.ceil(milisecond / 3600000) + ' giờ trước';
        }
        else {
          return (
            'Hôm qua lúc '
            + this.datePipe.transform(datetime, 'HH:mm')
          );
        }
      }
      if (milisecond >= 86400000) {
        if (
          datetime.getDate() == now.getDate() - 1
          && datetime.getMonth() == now.getMonth()
          && datetime.getYear() == now.getYear()
        ) {
          return (
            'Hôm qua lúc '
            + this.datePipe.transform(datetime, 'HH:mm')
          );
        }
        else {
          return this.datePipe.transform(
            datetime,
            'dd/MM/yyyy HH:mm'
          );
        }
      }
    }
    else {
      milisecond = -milisecond;
      if (milisecond < 30000) {
        // 30 giây
        return 'Vài giây nữa';
      }
      if (milisecond >= 30000 && milisecond < 90000) {
        // 30 giây - 90 giây
        return 'Một phút nữa';
      }
      if (milisecond < 300000) {
        // 5 phút
        return 'Vài phút nữa';
      }
      if (milisecond >= 300000 && milisecond < 3600000) {
        // dưới 1 tiếng
        return Math.ceil(milisecond / 60000) + ' phút nữa';
      }
      if (milisecond >= 3600000 && milisecond < 18000000) {
        // dưới 5 tiếng
        return 'Vài giờ nữa';
      }
      if (milisecond >= 18000000 && milisecond < 86400000) {
        // dưới 1 ngày
        if (datetime.getDate() == now.getDate()) {
          return Math.ceil(milisecond / 3600000) + ' giờ nữa';
        }
        else {
          return (
            'Ngày mai lúc '
            + this.datePipe.transform(datetime, 'HH:mm')
          );
        }
      }
      if (milisecond >= 86400000) {
        if (
          datetime.getDate() == now.getDate() - 1
          && datetime.getMonth() == now.getMonth()
          && datetime.getYear() == now.getYear()
        ) {
          return (
            'Ngày mai lúc '
            + this.datePipe.transform(datetime, 'HH:mm')
          );
        }
        if (
          datetime.getDate() == now.getDate() - 2
          && datetime.getMonth() == now.getMonth()
          && datetime.getYear() == now.getYear()
        ) {
          return 'Hai ngày nữa';
        }
        else if (
          datetime.getDate() == now.getDate() - 3
          && datetime.getMonth() == now.getMonth()
          && datetime.getYear() == now.getYear()
        ) {
          return 'Ba ngày nữa';
        }
        else {
          return this.datePipe.transform(
            datetime,
            'dd/MM/yyyy HH:mm'
          );
        }
      }
    }

    return '';
  }

  private renderDate(datetime, format: 'normal' | 'fromNow' = 'normal') {
    if (!datetime) {
      return '';
    }
    if (typeof datetime === 'string') {
      datetime = new Date(datetime + '');
    }

    if (format === 'normal') {
      return this.datePipe.transform(datetime, 'dd/MM/yyyy');
    }

    const now: any = new Date();
    if (
      datetime.getMonth() == now.getMonth()
      && datetime.getYear() == now.getYear()
    ) {
      const days = datetime.getDate() - now.getDate();
      if (days == 0) {
        return 'Hôm nay';
      }
      else if (days == 1) {
        return 'Ngày mai';
      }
      else if (days == -1) {
        return 'Hôm qua';
      }
      else if (days == 2) {
        return 'Hai ngày nữa';
      }
      else if (days == -2) {
        return 'Hai ngày trước';
      }
      else if (days == 3) {
        return 'Ba ngày nữa';
      }
      else if (days == -3) {
        return 'Ba ngày trước';
      }
      else {
        return this.datePipe.transform(datetime, 'dd/MM/yyyy');
      }
    }
    else {
      return this.datePipe.transform(datetime, 'dd/MM/yyyy');
    }
  }
}
