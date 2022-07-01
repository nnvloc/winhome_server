export interface NotificationMessage {
  data: any,
  notification: {
    title: string,
    body: string
  },
  token: string | string[],
}
