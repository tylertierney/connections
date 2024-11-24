import { PropsWithChildren } from "react";

export default function ActionButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren
) {
  const { children, onClick } = props;

  const className = "action-button " + props.className;

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
