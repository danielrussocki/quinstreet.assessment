import { animate } from "motion";

type Options = {
  textSelector: string;
  loaderSelector: string;
};

const defaultOptions: Options = {
  textSelector: ".app-button-text",
  loaderSelector: ".app-button-loader",
};

export class Button {
  private loading: boolean = false;
  private element: HTMLButtonElement;
  private textElement: HTMLSpanElement;
  private loaderElement: Element;

  constructor(selector: string, opts: Options = defaultOptions) {
    const el = document.querySelector<HTMLButtonElement>(selector);
    if (el == null) throw new Error("Button element not found");
    this.element = el;

    const loader = this.element.querySelector<Element>(opts.loaderSelector);
    if (loader == null)
      throw new Error(
        "The loader element inside the button element is not fount"
      );
    this.loaderElement = loader;

    const textEl = this.element.querySelector<HTMLSpanElement>(
      opts.textSelector
    );
    if (textEl == null)
      throw new Error(
        "The text element inside the button element is not fount"
      );
    this.textElement = textEl;
  }

  async handleContent() {
    if (!this.loading) {
      await animate([
        [this.textElement, { opacity: 1, pointerEvents: "auto" }],
        [this.loaderElement, { opacity: 0, pointerEvents: "none" }, { at: 0 }],
      ]);
    } else {
      await animate([
        [this.textElement, { opacity: 0, pointerEvents: "none" }],
        [this.loaderElement, { opacity: 1, pointerEvents: "auto" }, { at: 0 }],
      ]);
    }
  }

  setLoading(value: boolean) {
    this.loading = value;
    this.handleContent();
  }
}
