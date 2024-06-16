export default class NotificationModel {
  id: number = 0;
  text: string;
  color: string;
  icon: string = "mdi-information";
  timeout: number;
  showing: boolean = false;

  constructor(
    text: string,
    color: string,
    { timeout, icon }: { timeout: number; icon: string } = {
      timeout: 6000,
      icon: "mdi-information",
    }
  ) {
    this.text = text;
    this.color = color;
    this.timeout = timeout;
    this.icon = icon;
  }
}
