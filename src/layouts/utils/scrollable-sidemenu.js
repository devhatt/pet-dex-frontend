export default function initializeScrollable(
  hamburger,
  exitmenu,
  itemsMenu,
  home,
) {
  const breakpointDesktop = 1024;

  function openMenu() {
    home.classList.remove('home--exit-menu');
    home.classList.add('home--open-menu');
  }

  function closeMenu() {
    home.classList.remove('home--open-menu');
    home.classList.add('home--exit-menu');
  }

  if (window.innerWidth < breakpointDesktop) {
    hamburger.addEventListener('click', openMenu);
    exitmenu.addEventListener('click', closeMenu);
  }

  function activeClassMenu(selectedItem) {
    itemsMenu.forEach((li) => {
      li.classList.remove('side-menu-content__menuitens--active');
    });

    selectedItem.classList.add('side-menu-content__menuitens--active');

    if (window.innerWidth < breakpointDesktop) closeMenu();
  }

  itemsMenu.forEach((li) => {
    li.addEventListener('click', activeClassMenu.bind(null, li));
  });

  return {
    openMenu,
    closeMenu,
  };
}
