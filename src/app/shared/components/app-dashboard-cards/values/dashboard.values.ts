import { DashboardCard } from '../interfaces/dashboard-card';
import {
  OTI_DASHBOARD_KEY,
  OTI_PROVISIONING_KEY,
  RTPD_DASHBOARD_KEY,
  RTPD_PROVISIONING_KEY,
} from '@configs/index';

export const deafultDashboardCards: DashboardCard[] = [
  {
    title: 'RTPD',
    desc: 'Dashboard',
    gradient: '-47deg, #00ABE3 0%, #0072C3 100%',
    boxBorder: '2px solid #0072C3',
    disable: true,
    selected: false,
    route: RTPD_DASHBOARD_KEY,
  },
  {
    title: 'RTPD',
    desc: 'Provisioning',
    gradient: '-45deg, #20994F 0%, #0E6027 100%',
    boxBorder: '2px solid #0E6027',
    disable: true,
    selected: false,
    route: RTPD_PROVISIONING_KEY,
  },
  {
    title: 'OTI',
    desc: 'Dashboard',
    gradient: '-46deg, #AC1568 0%, #740937 100%',
    boxBorder: '2px solid #740937',
    disable: true,
    selected: false,
    route: OTI_DASHBOARD_KEY,
  },
  {
    title: 'OTI',
    desc: 'Provisioning',
    gradient: '-45deg, #803EBF 0%, #491D8B 100%',
    boxBorder: '2px solid #491D8B',
    route: OTI_PROVISIONING_KEY,
    selected: false,
  },
];
