import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1000"
      height="1000"
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>VBuild</title>
      <path
        d="M610.675 476L761.201 209L835.557 209C983.113 209 977.151 476 835.557 476H610.675Z"
        fill="#F3A012"
      />
      <path
        d="M438.749 790L589.785 521H835.557C976.164 521 982.126 790 835.557 790H438.749Z"
        fill="black"
      />
      <path d="M57 209H711.84L385.414 790L57 209Z" fill="black" />
    </svg>
  );
}
