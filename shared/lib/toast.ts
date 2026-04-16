import { toast } from "sonner";

export const showError = (msg: string) =>
  toast.error(msg, { duration: 3000 });
