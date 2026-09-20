import type { PropsWithChildren } from "react";

type ScreenShellProps = PropsWithChildren<{
  className?: string;
}>;

export function ScreenShell({ children, className }: ScreenShellProps) {
  const classes = [
    "relative isolate mx-auto min-h-dvh w-full max-w-[390px]",
    "overflow-x-hidden bg-ocean-50",
    "sm:my-6 sm:min-h-[844px] sm:rounded-[2rem] sm:shadow-card",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <main className={classes}>{children}</main>;
}
