type ClickLike = {
  defaultPrevented: boolean;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
};

/**
 * Only route plain left clicks inside the app. Modified clicks and middle
 * clicks keep the browser's native behaviour, including opening a new tab.
 */
export function isPlainClick(event: ClickLike) {
  return (
    !event.defaultPrevented &&
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function focusElement(element: HTMLElement | null) {
  if (!element) return;

  if (!element.hasAttribute("tabindex")) {
    element.setAttribute("tabindex", "-1");
  }

  element.focus({ preventScroll: true });
}
