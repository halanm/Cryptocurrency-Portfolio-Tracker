import { createContext } from "react";

type AlertContext = {
  alert: Alert | null;
  closeAlert: () => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
};

export const AlertContext = createContext({} as AlertContext);

export type Alert = {
  id: string;
  message: string;
  type?: "warning" | "success";
  timeout: NodeJS.Timeout;
};
