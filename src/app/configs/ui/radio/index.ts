import { IRadio } from './radio.model';
export * from './radio.model';

// Radio Boxes
export const SubscriptionTypes: IRadio[] = [
  { key: 'community', value: 'Community Editionnnn' },
  { key: 'enterprise', value: 'Enterprise Edition' },
];

export const ExpDates: IRadio[] = [
  { key: 'never', value: 'Never' },
  { key: 'custom', value: 'Custom' },
];

export const ClassifierList: IRadio[] = [
  { key: 'cs', value: 'cs' },
  { key: 'csvc', value: 'csvc' },
  { key: 'rw', value: 'rw' },
  { key: 'sw', value: 'sw' },
  { key: 'nlp', value: 'nlp' },
  { key: 'scam', value: 'scam' },
  { key: 'handler', value: 'handler' },
  { key: 'gsb', value: 'gsb' },
  { key: 'annotator', value: 'annotator' },
];
