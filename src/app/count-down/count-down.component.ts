import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss'],
})
export class CountDownComponent implements OnInit, OnDestroy {
  private countDownSub: Subscription;

  public dateNow = new Date();
  @Input() dDay: Date;

  milliSecondsInaSecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  secondsInAMin = 60;
  daysInaMonth = 0;
  monthsInAYear = 12;
  public timeDiferrence;
  public secondsToDDay;
  public minutesToDDay;
  public hoursToDDay;
  public daysToDDay;
  public monthsToDDay;
  public yearsToDDay;

  countdown = '1 year 2 month 1 day 1 hour 2 minutes 1 second';

  constructor() {}
  ngOnDestroy(): void {
    this.countDownSub.unsubscribe();
  }

  ngOnInit(): void {
    this.countDownSub = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  private getTimeDifference() {
    if (this.dDay) {
      this.timeDiferrence = this.dDay.getTime() - new Date().getTime();
      this.daysInaMonth = this.getDaysInaMonth(this.dateNow.getMonth());
      this.allocateTimeUnits(this.timeDiferrence);
    }
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDDay = Math.floor(
      (timeDifference / this.milliSecondsInaSecond) % this.secondsInAMin
    );
    this.minutesToDDay = Math.floor(
      (timeDifference / (this.milliSecondsInaSecond * this.minutesInAnHour)) %
        this.secondsInAMin
    );
    this.hoursToDDay = Math.floor(
      (timeDifference /
        (this.milliSecondsInaSecond *
          this.minutesInAnHour *
          this.secondsInAMin)) %
        this.hoursInADay
    );
    this.daysToDDay = Math.ceil(
      (timeDifference /
        (this.milliSecondsInaSecond *
          this.minutesInAnHour *
          this.secondsInAMin *
          this.hoursInADay)) %
        this.daysInaMonth
    );
    this.monthsToDDay = Math.floor(
      (timeDifference /
        (this.milliSecondsInaSecond *
          this.secondsInAMin *
          this.minutesInAnHour *
          this.hoursInADay *
          this.daysInaMonth)) %
        this.monthsInAYear
    );
    this.yearsToDDay = Math.floor(
      (timeDifference /
        (this.milliSecondsInaSecond *
          this.minutesInAnHour *
          this.secondsInAMin *
          this.hoursInADay *
          this.daysInaMonth *
          this.monthsInAYear)) %
        this.monthsInAYear
    );
  }

  private getDaysInaMonth(month: number): number {
    console.log(month, 'month');
    switch (true) {
      case month % 2 == 0 && month !== 1:
      case month === 7:
        return 31;
      case month % 2 !== 0:
        return 30;
      case month === 1 && (month % 400 === 0 || month % 4 === 0):
        return 29;
      case month === 1:
        return 28;
      default:
        return 0;
    }
  }

  checkReleased() {
    return this.dDay > this.dateNow;
  }
}
