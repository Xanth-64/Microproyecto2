import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-page-scroll',
  templateUrl: './page-scroll.component.html',
  styleUrls: ['./page-scroll.component.scss']
})
export class PageScrollComponent implements OnInit {
  @Input() next: string;
  @Input() before: string;
  @Input() num: number;
  @Output() numOUT = new EventEmitter<number>();
  constructor() { }
  ngOnInit(): void {
  }

  goNext(){
    this.numOUT.emit(this.num + 1);
  }
  goBefore(){
    this.numOUT.emit(this.num - 1);
  }
}
