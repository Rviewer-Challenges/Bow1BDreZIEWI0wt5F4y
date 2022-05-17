import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.css']
})
export class ChooseLevelComponent implements OnInit {

  @Output() sendChosenLevel = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  setLevel(level: number) {
    this.sendChosenLevel.emit(level);
  }

}
