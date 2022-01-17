export interface PanelHeader {
  title: string;
  clearIcon: string;
  onCloseHandler: () => {};
}
export interface Panel {
  panelHeader: PanelHeader;
  panelFooter: PanelFooter;
}

export interface FooterActionState {
  next?: { state: boolean; disable?: boolean };
  back?: { state: boolean; disable?: boolean };
  save?: { state: boolean; disable?: boolean };
  close?: { state: boolean; disable?: boolean };
}

export interface PanelFooter {
  next?: () => {};
  back?: () => {};
  save?: () => {};
  close?: () => {};
}
