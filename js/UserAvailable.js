
var userNav = document.getElementById('navbar_user');

function ChangeMenu() {

    let user = null;
    if (localStorage.getItem("token")) {
        user = jwt_decode(localStorage.getItem("token"));
    }

    if (typeof user !== "undefined" && user) {

        if (user.roles == "user") {
            userNav.innerHTML = `
    <button id="accountButton" type="button" class="flex text-lg bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false">
    <a href="/Profile.html">
            <img id="accountImage" class="account-image rounded-full" src="https://goose.itstep.click/images/${user.image}" alt="user photo">

    </a>
    </button>
          `;

        }
    //    else if (user.roles == "admin") {
    //        userNav.innerHTML = `
    //<button id="accountButton" type="button" class="flex text-lg bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 " id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
    //<a href="/pages/admin/adminPanel.html">
    //        <img id="accountImage" class="account-image rounded-full" src="/images/adminIcon.png" alt="user photo">

    //</a>
    //</button>
    //      `;
    //    }
    }
    else {
        userNav.innerHTML = `
                      <div class="max-w-7xl mx-auto flex justify-between items-center px-6">
        <!-- Логотип -->
        <a href="#" class="text-white text-3xl font-bold tracking-wide flex items-center space-x-3 hover:scale-105 transform transition duration-300">
            <img src="/images/icon-img.png" class="h-12 rounded-full shadow-md" alt="Logo">
            <span class="text-gray-100">SignUp Form</span>
        </a>

        <!-- Контейнер для кнопок -->
        <div class="ml-auto bg-white/10 p-2 rounded-lg shadow-md flex space-x-4">
            <a href="/index.html" class="text-white text-lg font-medium px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 transition duration-300 shadow-md">
                Sign Up
            </a>
            <a href="/Login.html" class="text-white text-lg font-medium px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 transition duration-300 shadow-md">
                Login
            </a>
        </div>
    </div>
                            `;
    }

}

document.addEventListener('DOMContentLoaded', ChangeMenu);