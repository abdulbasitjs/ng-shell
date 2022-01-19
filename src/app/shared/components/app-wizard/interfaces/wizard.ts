export interface StepModel {
  stepIndex: number;
  isComplete: boolean;
}

export enum Action {
  Next = 'next',
  Back = 'back',
  Save = 'save',
  Close = 'close'
}
