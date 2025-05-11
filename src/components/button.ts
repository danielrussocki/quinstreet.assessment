type Options = {
  textSelector: string;
  loaderSelector: string;
};

const defaultOptions: Options = {
  textSelector: ".app-button-text",
  loaderSelector: ".app-button-loader",
};

export class Button {
  private element: HTMLButtonElement;
  private textElement: HTMLSpanElement;

  constructor(selector: string, opts: Options = defaultOptions) {
    const el = document.querySelector<HTMLButtonElement>(selector);
    if (el == null) throw new Error("Button element not found");
    this.element = el;

    const textEl = this.element.querySelector<HTMLSpanElement>(
      opts.textSelector
    );
    if (textEl == null)
      throw new Error(
        "The text element inside the button element is not fount"
      );
    this.textElement = textEl;
  }

  setDisabled(value: boolean) {
    this.element.disabled = value;
  }

  setText(value: string) {
    this.textElement.textContent = value;
  }
}
