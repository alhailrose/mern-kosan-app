type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export const Toast = ({ message, type }: ToastProps) => {
  return (
    <div
      className={`${
        type === "SUCCESS" ? "bg-green-500" : "bg-red-500"
      } text-white p-3 rounded-md`}
    >
      {message}
    </div>
  );
};
