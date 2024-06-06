import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Exercise } from '../../models/exercise';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'exercise-card',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './exercise-card.component.html',
  styleUrl: './exercise-card.component.scss'
})
export class ExerciseCardComponent {
  @Input() item!: Exercise
  @Output() cardClick = new EventEmitter<string>()

  openDetails(exerciseId: string) {
    this.cardClick.emit(exerciseId)
  }
}
