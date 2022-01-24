export interface StepModel {
  stepIndex: number;
  isComplete: boolean;
  label?: string;
}

export enum Action {
  Next = 'next',
  Back = 'back',
  Save = 'save',
  Close = 'close'
}
