import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}
  transform(dateString: string, ...args: unknown[]): unknown {
    return moment(dateString).from(this.datePipe.transform((new Date), 'MM/dd/yyyy h:mm:ss'));
    // return moment(dateString).fromNow();

  }

}

