﻿document.addEventListener('DOMContentLoaded', function () {
    ChangeMenu();
});


function ChangeMenu() {
    var userNav = document.getElementById('navbar_user');
    if (!userNav) {
        console.log('Element navbar_user not found!');
        return;
    }


    let user = null;
    if (localStorage.getItem("token")) {
        user = jwt_decode(localStorage.getItem("token"));
    }

    if (typeof user !== "undefined" && user) {

        if (user.roles == "user") {
            userNav.innerHTML = `                
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6  h-14">
        <!-- Логотип -->
        <a href="#" class="text-black text-2xl font-bold tracking-wide flex items-center space-x-3">
            <img src="/images/icon-img.png" class="h-12 rounded-full shadow-md" alt="Logo">
              <span class="text-black-500">SignUp Form</span>
        </a>

        <div class="flex items-center justify-end space-x-6">
            <!-- Ім'я користувача -->
            <span class="text-black text-lg font-semibold">${user.name}</span>

            <!-- Кнопка профілю -->
            <div class="relative ml-20">
                <button id="accountButton" type="button" class="flex items-center bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 w-12 h-12">
                    <img id="accountImage" class="rounded-full w-12 h-12 object-cover" src="${window.API_BASE_URL}/images/100_${user.image}" alt="user photo">
                </button>

                <!-- Випадаюче меню -->
                <div id="dropdownMenu" class="hidden absolute right-0 bg-white text-black rounded shadow-lg mt-2 p-2 w-40 z-10">
                    <ul class="w-full">
                        <li>
                            <a href="/Profile.html" style="cursor:pointer" class="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded">Профіль</a>
                        </li>
                        <li>
                            <a onclick="logout()" style="cursor:pointer" class="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded">Вийти</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
                    `;
            var accountButton = document.getElementById('accountButton');
            var dropdownMenu = document.getElementById('dropdownMenu');

            accountButton.addEventListener('click', function (event) {
                event.stopPropagation(); 

                var buttonRect = accountButton.getBoundingClientRect();
                var dropdownRect = dropdownMenu.getBoundingClientRect();

                var leftOffset = buttonRect.left - window.scrollX;
                var topOffset = buttonRect.bottom + window.scrollY;


                dropdownMenu.style.left = leftOffset - 'px';
                dropdownMenu.style.top = topOffset + 'px';


                dropdownMenu.classList.toggle('hidden');

            });

        }
        else if (user.roles == "admin") {       
            userNav.innerHTML = `
         <div class="max-w-7xl mx-auto flex justify-between items-center px-6 h-14">
        <!--Логотип-->
        <a href="#" class="text-black text-2xl font-bold tracking-wide flex items-center space-x-3">
            <img src="/images/icon-img.png" class="h-12 rounded-full shadow-md" alt="Logo">
            <span class="text-black-500">SignUp Form</span>
        </a>

        <div class="flex items-center justify-end space-x-6">
            <!-- Ім'я користувача -->
            <span class="text-black text-lg font-semibold">Admin</span>

            <!-- Кнопка профілю -->
            <div class="relative ml-20">
                <button id="accountButton" style="width: 48px; height: 48px;" type="button" class="flex items-center bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300">
                    <img id="accountImage" class="rounded-full w-12 h-12 object-cover" src="/images/adminIcon.png" alt="user photo">
                </button>

                <!-- Випадаюче меню -->
                <div id="dropdownMenu" class="hidden absolute right-0 bg-white text-black rounded shadow-lg mt-2 p-2 w-40 z-10">
                    <ul class="w-full">
                        <li>
                            <a onclick="window.location.href='/Profile.html'" style="cursor:pointer" class="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded">Профіль</a>
                        </li>
                        <li>
                            <a onclick="logout()" style="cursor:pointer" class="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded">Вийти</a>
                        </li>
                           <li>
                            <a onclick="window.location.href='/pages/admin/AdminPanel.html'" style="cursor:pointer" class="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded">Адмін панель</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div >
                    `;


            var accountButton = document.getElementById('accountButton');
            var dropdownMenu = document.getElementById('dropdownMenu');

            accountButton.addEventListener('click', function (event) {
                event.stopPropagation();

                var buttonRect = accountButton.getBoundingClientRect();
                var dropdownRect = dropdownMenu.getBoundingClientRect();

                var leftOffset = buttonRect.left - window.scrollX;
                var topOffset = buttonRect.bottom + window.scrollY;


                dropdownMenu.style.left = leftOffset - 'px';
                dropdownMenu.style.top = topOffset + 'px';


                dropdownMenu.classList.toggle('hidden');

            });
        }
    }


    else {
        userNav.innerHTML = `
                       <div class="max-w-7xl mx-auto flex justify-between items-center px-6 h-14">
                <!-- Логотип -->
                <a href="#" class="text-black text-2xl font-bold tracking-wide flex items-center space-x-3">
                    <img src="/images/icon-img.png" class="h-12 rounded-full shadow-md" alt="Logo">
                    <span class="text-black-500">SignUp Form</span>
                </a>

                <!-- Контейнер для кнопок -->
                <div class="bg-white/10 p-2 rounded-lg shadow-md flex space-x-4">
                    <a href="/index.html" class="text-black text-lg font-medium px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 transition duration-300 shadow-md">
                        Sign Up
                    </a>
                    <a href="/Login.html" class="text-black text-lg font-medium px-6 py-3 rounded-md bg-blue-500 hover:bg-blue-400 transition duration-300 shadow-md">
                        Login
                    </a>
                </div>
            </div>
                `;
    }

}


function logout() {
    localStorage.removeItem("token");
    window.location.href = "/Login.html";
}