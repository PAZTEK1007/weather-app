const scroller = () => {
    const scrollers = document.querySelectorAll(".slide-container");
  
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scrollers.forEach((scroller) => {

        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".slide-inner");
        const scrollerContent = Array.from(scrollerInner.children);
  
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  };
  
  export { scroller };
  