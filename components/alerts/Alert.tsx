/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

interface PropsI {
  variant: "info" | "warning" | "error" | "success";
}

const Alert: FC = () => {
  return (
    <div tw="w-full fixed bottom-0.5 left-0">
      <div tw="border-green-500 dark:bg-gray-700 bg-gray-200 border flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md">
        <div tw="bg-green-500 flex items-center justify-center w-12">
          <svg
            tw="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
          </svg>
        </div>

        <div tw="px-4 py-2 -mx-3">
          <div tw="mx-3">
            <span tw="font-semibold text-green-500 dark:text-green-400">
              Success
            </span>
            <p tw="text-sm text-gray-600 dark:text-gray-200">
              Your account was registered!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
