export interface Toast {
  id?: number;
  type: 'info' | 'success' | 'error' | 'copy' | 'sad';
  dismissible?: boolean;
  timeout?: number;
  message?: string;
  txnHash?: string;
}

export type ScreenMode = 'desktop' | 'mobile';
