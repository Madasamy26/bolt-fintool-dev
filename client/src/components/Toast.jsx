// src/components/ui/CommonToast.jsx
import React from "react";
import { useToast } from "@/hooks/use-toast"; // Adjust the import based on your file structure
import { Toast, ToastProvider, ToastViewport } from "./ui/toast"; // Adjust the import based on your file structure
import { X } from "lucide-react";

const CommonToast = () => {
  const { toasts, dismiss } = useToast();

  const getToastStyle = (type) => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-black";
      case "notification":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <ToastProvider>
       <ToastViewport className="fixed top-4 right-4 z-50 space-y-2"> {/* Positioning the ToastViewport */}
      {toasts.map((toast) => (
        <Toast key={toast.id} className={`flex justify-between items-center p-4 rounded shadow-md ${getToastStyle(toast.type)}`}>
          <div className="flex-1">
            <span>{toast.message}</span>
          </div>
          <button onClick={() => dismiss(toast.id)} className="ml-4">
            <X className="w-4 h-4" /> {/* X icon for dismissing the toast */}
          </button>
        </Toast>
      ))}
    </ToastViewport>
    </ToastProvider>
  );
};

export default CommonToast;
