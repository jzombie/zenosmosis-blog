(function () {
  const getDepth = (list) => {
    let depth = -1;
    let current = list;
    while (current) {
      if (current.tagName === "UL") {
        depth++;
      }
      current = current.parentElement;
    }
    return depth;
  };

  const attachDropdown = (list) => {
    if (list.dataset.dropdownAttached === "true") {
      return;
    }
    const parentLi = list.parentElement;
    if (!parentLi || parentLi.tagName !== "LI") {
      return;
    }

    const headingLink = parentLi.querySelector(":scope > a") || parentLi.querySelector("a");
    const labelText = headingLink ? headingLink.textContent.trim() : "nested headings";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "toc__toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", `Toggle nested headings under ${labelText}`);
    toggle.title = "Toggle sub-sections";

    parentLi.classList.add("toc__has-children");
    const childNodes = Array.from(parentLi.childNodes);
    const firstElement = childNodes.find(
      (node) => node.nodeType === Node.ELEMENT_NODE && node !== list
    );
    if (firstElement) {
      parentLi.insertBefore(toggle, firstElement);
    } else {
      parentLi.insertBefore(toggle, list);
    }
    list.hidden = true;

    toggle.addEventListener("click", () => {
      const willOpen = list.hidden;
      list.hidden = !willOpen;
      toggle.setAttribute("aria-expanded", String(willOpen));
      toggle.classList.toggle("is-open", willOpen);
      parentLi.classList.toggle("toc__open", willOpen);
    });

    list.dataset.dropdownAttached = "true";
  };

  const initTocDropdowns = () => {
    const toc = document.querySelector(".toc #TableOfContents");
    if (!toc) {
      return;
    }

    const lists = toc.querySelectorAll("ul");
    lists.forEach((list) => {
      const depth = getDepth(list);
      if (depth >= 2) {
        attachDropdown(list);
      }
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTocDropdowns);
  } else {
    initTocDropdowns();
  }
})();
