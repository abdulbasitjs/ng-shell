import { DashboardCard } from '../interfaces/dashboard-card';

export const deafultDashboardCards: DashboardCard[] = [
  {
    title: 'RTPD',
    desc: 'Dasboard',
    gradient: '-47deg, #00ABE3 0%, #0072C3 100%',
    boxBorder: '2px solid #0072C3',
    disable: true,
    route: 'rtpd-dashboard'
  },
  {
    title: 'RTPD',
    desc: 'Provisioning',
    gradient: '-45deg, #20994F 0%, #0E6027 100%',
    boxBorder: '2px solid #0E6027',
    disable: true,
    route: 'rtpd-provisioning'
  },
  {
    title: 'OTI',
    desc: 'Dasboard',
    gradient: '-46deg, #AC1568 0%, #740937 100%',
    boxBorder: '2px solid #740937',
    disable: true,
    route: 'oti-dashboard'
  },
  {
    title: 'OTI',
    desc: 'Provisioning',
    gradient: '-45deg, #803EBF 0%, #491D8B 100%',
    boxBorder: '2px solid #491D8B',
    route: 'oti-provisioning'
  },
];