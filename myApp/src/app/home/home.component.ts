import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentDate: string | null | undefined;
  constructor(public datePipe: DatePipe) {}

  ngOnInit(): void {
    
    this.currentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
  }
}
