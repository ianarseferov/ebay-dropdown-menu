//display drop down menu on hover state
const menuItems = document.querySelectorAll(".menu-item");
const menu = document.querySelector("main");
const subMenu = document.querySelector(".sub-menu");

menuItems.forEach(item => item.addEventListener("mouseenter", () => onMouseEnter(item)));
menu.addEventListener("mouseleave", () => hideSubMenu());

let menuActive = null;
const onMouseEnter = (item) => {
    if (menuActive) {
        menuActive.classList.remove("active-hover");
    }
    menuActive = item;
    item.classList.add("active-hover");
    showSubMenu();
    populateCategories(item);
}

const showSubMenu = () => {
    subMenu.classList.add('show');
};

const hideSubMenu = () => {
    //remove white background on item after leave
    if (menuActive) {
        menuActive.classList.remove("active-hover");
    }
    subMenu.classList.remove('show');
}

const getDataFromFakeAPI = async () => {
    const data = await fetch(`./data.json`);
    const response = await data.json();
    return response;
}

const populateCategories = async (item) => {
    const getFakeData = await getDataFromFakeAPI();
    const popularList = document.querySelector(".popular-categories");
    const moreList = document.querySelector(".more-categories");
    const backgorundImage = document.querySelector(".bg-image");
    backgorundImage.src = "";
    popularList.innerHTML = "";
    moreList.innerHTML = "";
    getFakeData.forEach(data => {
        if (item.childNodes[0].innerText === data.type) {
            data.popularCategories.forEach(pop => {
                popularList.innerHTML += `<li><a href="#">${pop}</a></li>`
            });
            data.moreCategories.forEach(more => {
                moreList.innerHTML += `<li><a href="#">${more}</a></li>`
            });
            backgorundImage.src = data.backgroundImage
        }
    })
}