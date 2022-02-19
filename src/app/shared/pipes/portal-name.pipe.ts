import { Pipe, PipeTransform } from '@angular/core';
const theme: any = {
  'oti-db': '-46deg, #AC1568 0%, #740937 100%',
  'oti-pp': '-45deg, #803EBF 0%, #491D8B 100%',
  'rtpd-db': '-47deg, #00ABE3 0%, #0072C3 100%',
  'rtpd-pp': '-45deg, #20994F 0%, #0E6027 100%',
};

@Pipe({ name: 'portal' })
export class ProtalPipe implements PipeTransform {
  transform(permission: any): any {
    const requiredData = permission.map((el: any) => ({
      bgColor: `linear-gradient(${theme[el["key"]]})`,
      label: el.value.l
        .split(' ')
        .reduce((acc: any, cur: any[]) => `${acc}${cur[0]}`, ''),

    } ));
    return requiredData;
  }
}