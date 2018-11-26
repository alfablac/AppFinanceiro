import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'statusPgto',
})
export class StatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args?: any): any {
    return value == 'true' ? "Pago" : "Não pago"
  }
}
