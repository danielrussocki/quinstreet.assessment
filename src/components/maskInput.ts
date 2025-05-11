type Options = {
  pattern: string;
};

const defaultOptions: Options = {
  pattern: "(###) ###-####",
};

export class MaskInput {
  private elements: NodeListOf<HTMLInputElement>;
  private options: Options;

  constructor(selector: string, opts: Options = defaultOptions) {
    const inputs = document.querySelectorAll<HTMLInputElement>(selector);
    this.elements = inputs;
    this.options = opts;
    this.init();
  }

  setMask(e: Event) {
    const target = e.target as HTMLInputElement;
    const val = target.value.replace(/\D/g, "");

    let i = 0;

    target.value = this.options.pattern.replace(/(?!\+)./g, (a) => {
      return /[#\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
  }

  init() {
    this.elements.forEach((input) => {
      input.addEventListener("input", this.setMask.bind(this));
      input.addEventListener("focus", this.setMask.bind(this));
      input.addEventListener("blur", this.setMask.bind(this));
    });
  }
}
