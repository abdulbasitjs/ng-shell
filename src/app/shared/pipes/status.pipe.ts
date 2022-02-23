import { Pipe, PipeTransform } from '@angular/core';

const status: any = {
  '1': 'Invited',
  '2': 'Active',
  'Active': 'Active',
  'Suspended': 'Suspended',
  'Disabled': 'Disabled'
}

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(row: any): any {

    return status[row];
  }
}
