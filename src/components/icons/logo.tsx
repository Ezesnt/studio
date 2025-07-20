import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <path d="M12 8v4l2 2" />
      <path d="m15.59 18.14-1.17-1.17" />
      <path d="m8.41 18.14 1.17-1.17" />
      <path d="M12 4V2" />
      <path d="M4 12H2" />
      <path d="M20 12h2" />
      <path d="m6.24 6.24 1.17 1.17" />
      <path d="m16.59 6.24-1.17 1.17" />
    </svg>
  );
}
