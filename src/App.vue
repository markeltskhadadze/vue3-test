<script setup>
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  import UsersList from './components/UsersList.vue'
  import { usersInfo } from '@/stores/users'

  const allUsers = usersInfo()
</script>

<template>
  <div class="flex items-center gap-8 my-6">
    <p class="user-list-header">Members</p>
    <input
        @input="allUsers.searchUsers"
        v-model="allUsers.searchValue"
        type="text"
        class="h-9 p-2 flex-1 border rounded border-grey-500 focus:border-blue-500
        placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
        placeholder="enter user name"
    />
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Filter
          <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
              <p @click="allUsers.filterBy('name')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Name</p>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <p @click="allUsers.filterBy('email')" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer']">Email</p>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
    <button
        @click="allUsers.addUserModal"
        class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem]
        font-semibold leading-5 text-white hover:bg-indigo-500"
    >
      Add user
    </button>
  </div>
  <UsersList />
</template>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px;
  }
  .user-list-header {
    font-size: 20px;
    color: #000000;
    text-transform: uppercase;
  }
</style>
