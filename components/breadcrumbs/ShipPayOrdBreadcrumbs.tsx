/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { useState } from "react";
import tw, { css, styled, theme } from "twin.macro";
import Link from "next/link";
import { useRouter } from "next/router";

const ShipmentPaymentOrderBreadcrumbs: FC = () => {
  const links = [
    {
      path: "/shipping",
      name: "Shipping",
      Icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
    },
    {
      path: "/payment",
      name: "Payment",
      Icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      path: "/place-order",
      name: "Place Order",
      Icon: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          tw="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const { asPath } = useRouter();

  const paintIndexes: number[] = [];
  let pass = false;

  links.forEach((item, i) => {
    if (pass) return;

    if (asPath === item.path) {
      pass = true;

      paintIndexes.push(i);

      return;
    }

    paintIndexes.push(i);
  });

  console.log({ paintIndexes });

  return (
    <section
      css={[
        css`
          border: crimson solid 1px;
          text-align: center;

          & a {
            ${tw`text-xs sm:text-sm  md:text-lg`}
          }

          & li {
            ${tw`dark:text-gray-50 text-gray-900`}
          }
        `,
      ]}
    >
      <nav tw="text-black font-bold my-8" aria-label="Breadcrumb">
        <ol tw="list-none p-0 inline-flex">
          {links.map(({ Icon, name, path }, i) => {
            return (
              <li key={`${name}-${i}`} tw="flex items-center">
                <Link href={path}>
                  <a tw="flex align-items[center]">
                    <span tw="mr-0.5">{name}</span>
                    <span>
                      <Icon />
                    </span>
                  </a>
                </Link>
                {i !== links.length - 1 && (
                  <svg
                    tw="fill-current w-3 h-3 mx-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
};

export default ShipmentPaymentOrderBreadcrumbs;
