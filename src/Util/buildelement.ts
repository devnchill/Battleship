class BuildElement {
  public element: HTMLElement;

  constructor(
    elementType: string,
    src?: string,
    alt?: string,
    id?: string,
    classlist: string[] = [],
    textContent = "",
    type?: string,
    children: HTMLElement[] = [],
  ) {
    this.element = document.createElement(elementType);
    if (id) {
      this.element.id = id;
    }
    this.element.textContent = textContent;
    this.element.classList.add(...classlist);
    if (type) {
      this.element.setAttribute("type", type); // Applies for input, button, etc.
    }
    if (elementType === "img") {
      if (src) {
        this.element.setAttribute("src", src);
      }
      if (alt) {
        this.element.setAttribute("alt", alt);
      }
    }
    children.forEach((child) => this.element.appendChild(child));
  }
}

export { BuildElement };
