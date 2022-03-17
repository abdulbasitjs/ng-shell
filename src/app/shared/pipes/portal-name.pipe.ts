import { Pipe, PipeTransform } from '@angular/core';
const theme: any = {
  'oti-db': '-46deg, #AC1568 0%, #740937 100%',
  'oti-pp': '-45deg, #803EBF 0%, #491D8B 100%',
  'rtpd-db': '-47deg, #00ABE3 0%, #0072C3 100%',
  'rtpd-pp': '-45deg, #20994F 0%, #0E6027 100%',
};

const friendlyName: any = {
  'oti-db': 'OTI Dashboard',
  'oti-pp': 'OTI Provisioning Portal',
  'rtpd-db': 'RTPD Dashboard',
  'rtpd-pp': 'RTPD Provisioning Portal',
};

@Pipe({ name: 'portal' })
export class ProtalPipe implements PipeTransform {
  transform(permission: any): any {
    let requiredData = permission.map((el: any) => ({
      bgColor: `linear-gradient(${theme[el['key']]})`,
      label: el.value.l
        .split(' ')
        .reduce((acc: any, cur: any[]) => `${acc}${cur[0]}`, ''),
      name: friendlyName[el['key']],
      fullLabel: el.value.l
    }));
    // FIXME:
    requiredData = requiredData.filter((el: any)=> el.name === 'OTI Provisioning Portal');
    return requiredData;
  }
}
