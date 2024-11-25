import { PropsWithChildren } from "react";

interface ActionButtonProps {
  variant?: "ghost";
}

export default function ActionButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> &
    PropsWithChildren &
    ActionButtonProps
) {
  const { children } = props;

  let className = "action-button";

  if (props.className) {
    className += " " + props.className;
  }

  if (props.variant === "ghost") {
    className += " ghost";
  }

  return (
    <button
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        }
        e.stopPropagation();
      }}
      className={className}
    >
      <span className="front">{children}</span>
    </button>
  );
}
