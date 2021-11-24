/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import tw, { css, styled, theme } from "twin.macro";

const SearchMobileToggle: FC = () => {
  return (
    <button tw="absolute right-2 top[80px] dark:text-gray-100 text-green-900 md:right-12 sm:right-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        tw="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};

export default SearchMobileToggle;
