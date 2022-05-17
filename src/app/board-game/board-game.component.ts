import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
  AfterViewInit,
  DoCheck,
} from '@angular/core';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css'],
})
export class BoardGameComponent implements OnInit, DoCheck {
  @ViewChild('card') card!: ElementRef;
  @ViewChild('boardGame') boardGame!: ElementRef;

  @Input() getChosenLevel: number = 0;
  @Output() sendShowChooseLevel = new EventEmitter<boolean>();

  firstMove: boolean = false;
  firstCard: any;
  firstCardId: string = '';
  secondCard: any;
  secondCardId: string = '';
  flipCardCount: number = 0;
  attempts: number = 0;
  isMatched: number = 0;
  newArray: any = [];
  newArrayLength: number = 0;
  loseGame: boolean = false;
  setGridColumns: string = '';
  setGridRows: string = '';

  imgArray = [
    { imagen: 'assets/img/morty1.png', id: '1' },
    { imagen: 'assets/img/morty2.png', id: '2' },
    { imagen: 'assets/img/morty3.png', id: '3' },
    { imagen: 'assets/img/morty4.png', id: '4' },
    { imagen: 'assets/img/morty5.png', id: '5' },
    { imagen: 'assets/img/morty6.png', id: '6' },
    { imagen: 'assets/img/morty7.png', id: '7' },
    { imagen: 'assets/img/morty8.png', id: '8' },
    { imagen: 'assets/img/morty9.png', id: '9' },
    { imagen: 'assets/img/morty10.png', id: '10' },
    { imagen: 'assets/img/morty11.png', id: '11' },
    { imagen: 'assets/img/morty12.png', id: '12' },
    { imagen: 'assets/img/morty13.png', id: '13' },
    { imagen: 'assets/img/morty14.png', id: '14' },
    { imagen: 'assets/img/morty15.png', id: '15' },
    { imagen: 'assets/img/morty16.png', id: '16' },
    { imagen: 'assets/img/morty17.png', id: '17' },
    { imagen: 'assets/img/morty18.png', id: '18' },
    { imagen: 'assets/img/morty19.png', id: '19' },
    { imagen: 'assets/img/morty20.png', id: '20' },
    { imagen: 'assets/img/morty21.png', id: '21' },
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.fisherYatesShuffle(this.imgArray);

    let arraySlice = this.imgArray.slice(0, this.getChosenLevel);
    for (let index = 0; index < arraySlice.length; index++) {
      this.newArray.push(arraySlice[index]);
      this.newArray.push({
        imagen: arraySlice[index].imagen,
        id: String(Number(arraySlice[index].id) * 100),
      });
    }

    this.newArrayLength = this.newArray.length / 2;
    this.fisherYatesShuffle(this.newArray);
  }

  ngDoCheck() {
    if (window.matchMedia('(max-width: 450px').matches == true) {
      if (this.getChosenLevel == 8) {
        this.setGridColumns = 'repeat(4,auto)';
        this.setGridRows = 'repeat(4,auto)';
      } else if (this.getChosenLevel == 12) {
        this.setGridColumns = 'repeat(4,auto)';
        this.setGridRows = 'repeat(6,auto)';
      } else if (this.getChosenLevel == 15) {
        this.setGridColumns = 'repeat(5,auto)';
        this.setGridRows = 'repeat(6,auto)';
      }
    } else if (
      window.matchMedia('(max-width: 950px) and (orientation: landscape)')
        .matches == true
    ) {
      if (this.getChosenLevel == 8) {
        this.setGridColumns = 'repeat(8,auto)';
        this.setGridRows = 'repeat(2,auto)';
      } else if (this.getChosenLevel == 12) {
        this.setGridColumns = 'repeat(8,auto)';
        this.setGridRows = 'repeat(3,auto)';
      } else if (this.getChosenLevel == 15) {
        this.setGridColumns = 'repeat(10,auto)';
        this.setGridRows = 'repeat(3,auto)';
      }
    } else {
      if (this.getChosenLevel == 8) {
        this.setGridColumns = 'repeat(4,auto)';
        this.setGridRows = 'repeat(4,auto)';
      } else if (this.getChosenLevel == 12) {
        this.setGridColumns = 'repeat(6,auto)';
        this.setGridRows = 'repeat(4,auto)';
      } else if (this.getChosenLevel == 15) {
        this.setGridColumns = 'repeat(6,auto)';
        this.setGridRows = 'repeat(5,auto)';
      }
    }
  }

  getLoseGame(e: any) {
    this.loseGame = e;
  }

  fisherYatesShuffle(arr: any) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  addRotateCard(id: any) {
    if (!this.loseGame) {
      const getCard = document.getElementById(id)!;
      this.renderer.addClass(getCard.children[0], 'rotateFront');
      this.renderer.addClass(getCard.children[1], 'rotateBack');
      this.renderer.setStyle(getCard, 'pointerEvents', 'none');

      if (!this.firstMove) {
        this.firstMove = true;
      }

      if (this.flipCardCount == 0) {
        this.firstCard = getCard.classList[0];
        this.firstCardId = getCard.id;
        this.flipCardCount++;
      } else if (this.flipCardCount == 1) {
        this.secondCard = getCard.classList[0];
        this.secondCardId = getCard.id;
        this.flipCardCount++;
        const getCards =
          this.elementRef.nativeElement.getElementsByClassName('card');
        for (let index = 0; index < getCards.length; index++) {
          this.renderer.setStyle(getCards[index], 'pointerEvents', 'none');
        }
        setTimeout(() => {
          this.checkMatch();
        }, 1000);
      } else {
        this.flipCardCount = 0;
      }
    }
  }

  checkMatch() {
    const getFirstCard = document.getElementById(this.firstCardId)!;
    const getSecondCard = document.getElementById(this.secondCardId)!;

    if (
      this.firstCard != this.secondCard ||
      this.firstCardId == this.secondCardId
    ) {
      this.renderer.removeClass(getFirstCard.children[0], 'rotateFront');
      this.renderer.removeClass(getFirstCard.children[1], 'rotateBack');
      this.renderer.removeClass(getSecondCard.children[0], 'rotateFront');
      this.renderer.removeClass(getSecondCard.children[1], 'rotateBack');
      this.attempts++;
    }

    if (
      this.firstCard == this.secondCard &&
      this.firstCardId != this.secondCardId
    ) {
      this.isMatched++;
      this.attempts++;
      this.renderer.addClass(getFirstCard, 'match');
      this.renderer.addClass(getSecondCard, 'match');
    }

    if (this.flipCardCount == 2) {
      this.flipCardCount = 0;
      this.firstCard,
        this.secondCard,
        this.firstCardId,
        (this.secondCardId = '');
    }

    const getCards =
      this.elementRef.nativeElement.getElementsByClassName('card');
    for (let index = 0; index < getCards.length; index++) {
      if (this.isMatched == this.newArrayLength) {
        this.renderer.setStyle(getCards[index], 'pointerEvents', 'none');
        this.renderer.setStyle(
          getCards[index].children[1],
          'backgroundColor',
          'lawngreen'
        );
      } else if (!getCards[index].classList.contains('match')) {
        this.renderer.setStyle(getCards[index], 'pointerEvents', 'auto');
      }
    }
  }
}
