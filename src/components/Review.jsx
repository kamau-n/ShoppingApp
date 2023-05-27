import React from "react";

export default function () {
  return (
    <ul className=" sm:flex gap-10 my-5 py-4">
      <li class="border-b border-gray-200 py-4">
        <div class="flex items-center">
          <img
            src="https://via.placeholder.com/48"
            alt="Avatar"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 class="text-l sm:text-xl font-bold">John Doe</h3>
            <p class="text-gray-600 text-sm">3 days ago</p>
          </div>
        </div>
        <p class="text-gray-700 text-sm x sm:text-xl mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
          mollis mauris. Nullam vitae sapien a libero pulvinar congue. Fusce id
          rutrum dolor. Donec vel maximus mauris.
        </p>
      </li>
      <li class="border-b border-gray-200 py-4">
        <div class="flex items-center">
          <img
            src="https://via.placeholder.com/48"
            alt="Avatar"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 class="sm:text-xl text-l  font-bold">John Doe</h3>
            <p class="text-gray-600 text-sm">3 days ago</p>
          </div>
        </div>
        <p class="text-gray-700 text-sm x sm:text-xl mt-4 line-highlight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
          mollis mauris. Nullam vitae sapien a libero pulvinar congue. Fusce id
          rutrum dolor. Donec vel maximus mauris.
        </p>
      </li>
      <li class="border-b border-gray-200 spacing-y-5 py-4">
        <div class="flex mx-auto items-center">
          <img
            src="https://via.placeholder.com/48"
            alt="Avatar"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 class="  font-bold text-sm x sm:text-xl">John Doe</h3>
            <p class="text-gray-600 text-sm">3 days ago</p>
          </div>
        </div>
        <p class="text-gray-700 text-sm x sm:text-xl  mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at
          mollis mauris. Nullam vitae sapien a libero pulvinar congue. Fusce id
          rutrum dolor. Donec vel maximus mauris.
        </p>
      </li>
      <li class="border-b border-gray-200 py-4">
        <div class="flex items-center">
          <img
            src="https://via.placeholder.com/48"
            alt="Avatar"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 class="sm:text-xl text-l  font-bold">Jane Smith</h3>
            <p class="text-gray-600 text-sm">1 week ago</p>
          </div>
        </div>
        <p class="text-gray-700  text-l sm:text-xl mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
          bibendum, odio eu feugiat pretium, mauris magna malesuada turpis, sit
          amet luctus dui purus at nunc.
        </p>
      </li>
    </ul>
  );
}
