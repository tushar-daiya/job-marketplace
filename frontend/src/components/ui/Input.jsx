import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export function Input({ placeholder, ...props }) {
  return (
    <input
      {...props}
      className="mt-1 block w-full rounded-lg p-4 outline-blue-800 border-gray-300 border border-solid h-12 shadow-sm"
      placeholder={placeholder}
    />
  );
}
export function PasswordInput({ placeholder, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mt-1 flex justify-between items-center focus-within:border-blue-800 focus-within:border-2 rounded-lg border-gray-300 border border-solid">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        className="block w-full rounded-lg p-4 outline-none h-12 shadow-sm"
        placeholder={placeholder}
      ></input>
      <div className="px-4">
        {showPassword ? (
          <EyeOff
            onClick={() => setShowPassword(false)}
            className="cursor-pointer"
          />
        ) : (
          <Eye
            onClick={() => setShowPassword(true)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}
export function Label({ children, ...props }) {
  return (
    <label
      className="block font-medium text-gray-700"
      name={props.name}
      htmlFor={props.htmlFor}
    >
      {children}
    </label>
  );
}
