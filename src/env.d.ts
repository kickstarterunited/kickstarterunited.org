declare namespace astroHTML.JSX {
  interface ButtonHTMLAttributes {
    /**
     * Specifies the action to be performed on an element being controlled by a
     * control <button> specified via the commandfor attribute. Part of the
     * Invoker Commands API. [More
     * info](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#command)
     */
    command?:
      | "show-modal"
      | "close"
      | "request-close"
      | "show-popover"
      | "hide-popover"
      | "toggle-popover"
      // See: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#custom_values
      | "--your-custom-value"
      // Allow any other string for forward compatibility
      | (string & {});
    /**
     * Turns a <button> element into a button, controlling the given interactive
     * element; takes the ID of the element to control as its value. Part of the
     * Invoker Commands API. [More
     * info](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#commandfor)
     */
    commandfor?: string;
  }
  interface SVGAttributes {
    "xmlns:inkscape"?: string;
    "xmlns:rdf"?: string;
    "xmlns:sodipodi"?: string;
  }
}
