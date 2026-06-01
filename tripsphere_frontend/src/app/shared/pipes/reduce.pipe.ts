import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduce',
  standalone: true
})
export class ReducePipe implements PipeTransform {
  transform<T, R>(items: T[] | null, callback: (accumulator: R, item: T) => R, initialValue: R): R {
    if (!items) return initialValue;
    return items.reduce(callback, initialValue);
  }
}
