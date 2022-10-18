export const NOTIFY_INFO = 'NOTIFY_INFO';
export const NOTIFY_ERROR = 'NOTIFY_ERROR';

export function notification(message, type = NOTIFY_INFO) {
  return {
    type,
    message
  };
}
