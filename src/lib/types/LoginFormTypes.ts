export enum LoginButton {
  STANDARD = "standard",
  FINGERPRINT = "fingerprint",
}

export interface LoginData {
  username: string;
  password: string;
}