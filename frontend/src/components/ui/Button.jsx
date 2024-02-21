import React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={`${props.className} border flex items-center justify-center gap-2 border-solid border-blue-800 rounded-lg font-semibold hover:bg-blue-50 text-blue-800 h-10 px-5`}
    >
      {children}
    </button>
  );
}
export function GoogleAuthButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={`${props.className} border flex items-center justify-center gap-2 bg-zinc-100 rounded-lg hover:bg-zinc-200 font-semibold h-10 px-5`}
    >
      <img src="/googleLogo.png" alt="Google Logo" className="h-6 w-6" />
      {children}
    </button>
  );
}
