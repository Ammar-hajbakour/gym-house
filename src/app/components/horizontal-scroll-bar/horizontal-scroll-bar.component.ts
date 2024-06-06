import { NgTemplateOutlet, UpperCasePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, input } from '@angular/core';

@Component({
  selector: 'horizontal-scroll-bar',
  standalone: true,
  imports: [NgTemplateOutlet, UpperCasePipe],
  templateUrl: './horizontal-scroll-bar.component.html',
  styleUrl: './horizontal-scroll-bar.component.scss'
})
export class HorizontalScrollBarComponent implements AfterViewInit {

  @Input() items: any[] = [];
  @Input() title!: string;
  @Input() itemWidth!: number;
  @Input() itemMargin!: number;
  @Output() itemSelected = new EventEmitter<any>();
  @ViewChild('scrollRef') scrollRef!: ElementRef<HTMLDivElement>;

  @ViewChild('defualtTemplate') defualtTemplate!: any;
  private _cardTemplate = this.defualtTemplate;
  @Input()
  public get cardTemplate() {
    return this._cardTemplate;
  }
  public set cardTemplate(value: any) {
    this._cardTemplate = value ?? this.defualtTemplate;
  }


  ngAfterViewInit(): void {
    this.cardTemplate ??= this.defualtTemplate
  }
  scroll(direction: 'left' | 'right') {
    if (!this.scrollRef || !this.scrollRef.nativeElement) {
      console.error('scrollRef is null or nativeElement is null');
      return;
    }
    if (direction !== 'left' && direction !== 'right') {
      console.error('Invalid direction');
      return
    }
    const scrollLeft = this.scrollRef.nativeElement.scrollLeft;
    const scrollAmount = this.itemWidth + this.itemMargin;
    const end = scrollAmount * (this.items.length - 1);

    if (direction === 'left') {
      if (scrollLeft === 0) {
        this.scrollRef.nativeElement.scrollLeft = end;
        return
      }
      this.scrollRef.nativeElement.scrollLeft -= scrollAmount;

    } else {
      if (scrollLeft >= end) {
        this.scrollRef.nativeElement.scrollLeft = 0;
        return
      }
      this.scrollRef.nativeElement.scrollLeft += scrollAmount;

    }
  }
  select(item: any, i: number) {
    if (!item) return
    this.itemSelected.emit(item)

    const children = this.scrollRef.nativeElement.children
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('selected')
    }
    const selectedElement = children[i]
    selectedElement.classList.add('selected')

  }
  ngOnInit(): void {
  }

}
