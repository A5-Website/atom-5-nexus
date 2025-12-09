// src/components/NavLink.tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className = "", activeClassName = "", pendingClassName = "", to, ...props }, ref) => {
    if (!to) {
      // avoid silent failure — warn and render a harmless span fallback
      console.warn("NavLink: missing `to` prop", props);
      return <span ref={ref as any} className={className}>{props.children}</span>;
    }

    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          // explicit ternaries so we only pass strings/undefined to cn
          cn(
            className,
            isActive ? activeClassName : undefined,
            typeof isPending !== "undefined" && isPending ? pendingClassName : undefined
          )
        }
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";
export { NavLink };
