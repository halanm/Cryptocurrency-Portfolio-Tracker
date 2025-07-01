import { useCallback, useMemo, useState } from "react";
import { AlertContext, type Alert } from "../contexts/AlertContext";

const createAlertId = (message: string) => `${message}-${crypto.randomUUID()}`;

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  const closeAlert = useCallback(() => {
    if (alert) {
      clearTimeout(alert.timeout);
      setAlert(null);
    }
  }, [alert]);

  const createAlert = useCallback(
    (message: Alert["message"], type: Alert["type"]) => {
      try {
        const alertMessage = message;

        const id = createAlertId(alertMessage);
        const timeout = setTimeout(() => closeAlert(), 15000);

        setAlert({ id, message: alertMessage, type, timeout });
      } catch (error) {
        throw new Error(`Error creating alert: ${error}`);
      }
    },
    [closeAlert]
  );

  const value = useMemo(
    () => ({
      alert,
      showSuccess: (message: string) => createAlert(message, "success"),
      showError: (message: string) => createAlert(message, "error"),
      closeAlert,
    }),
    [alert, createAlert, closeAlert]
  );

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
