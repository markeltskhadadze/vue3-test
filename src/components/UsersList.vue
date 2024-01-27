<script setup>
  import { onMounted } from 'vue'
  import { usersInfo } from '@/stores/users'
  import UserDetailesModal from '@/components/UserDetailesModal.vue'

  const allUsers = usersInfo()

  onMounted(async () => {
      await allUsers.getUsers()
  })
</script>

<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="(user, key) in allUsers.getUsersInfo" :key="key" class="flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="user.avatar" alt="" />
        <div class="min-w-0 flex-auto">
          <p
              @click="allUsers.showUserDetailesModal(user.first_name, user.email, user.avatar, user.id)"
              class="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            {{ user.first_name }}
          </p>
          <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ user.email }}</p>
        </div>
      </div>
      <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <div class="mt-1 flex items-center gap-x-1.5">
          <button
              @click="allUsers.deleteUser(user.id)"
              class="pointer-events-auto rounded-md bg-red-600 px-3 py-2 text-[0.8125rem]
                font-semibold leading-5 text-white hover:bg-red-500"
              >
                Delete
          </button>
        </div>
      </div>
    </li>
  </ul>
  <UserDetailesModal :mode="allUsers.mode" />
</template>