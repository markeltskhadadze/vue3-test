<script setup>
  import { onBeforeUnmount } from 'vue'
  import { usersInfo } from '@/stores/users'
  import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

  const allUsers = usersInfo()

  onBeforeUnmount(() => {
    allUsers.mode = ''
    allUsers.userEmail = ''
    allUsers.userName = ''
  })
</script>

<template>
  <TransitionRoot as="template" :show="allUsers.showDetailsModal">
    <Dialog as="div" class="relative z-10" @close="allUsers.showDetailsModal = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="flex justify-evenly my-8">
                <div v-if="!allUsers.mode" class="sm:col-span-4 flex flex-col items-center">
                  <label  class="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
                  <div class="mt-2">
                    <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="allUsers.userAvatar" alt="" />
                  </div>
                  <div class="sm:col-span-4">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                    <div class="mt-2">
                      <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" v-model="allUsers.phoneNumber" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Phone number" />
                      </div>
                    </div>
                  </div>
                  <div class="sm:col-span-4">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Address</label>
                    <div class="mt-2">
                      <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" v-model="allUsers.address" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="address" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-4 justify-end">
                  <div class="sm:col-span-4">
                    <label class="block text-sm font-medium leading-6 text-gray-900">User name</label>
                    <div class="mt-2">
                      <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" v-model="allUsers.userName" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="user name" />
                      </div>
                    </div>
                  </div>
                  <div class="sm:col-span-4">
                    <label class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                      <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input type="text" @blur="allUsers.validateEmail" v-model="allUsers.userEmail" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="email" />
                      </div>
                      <p v-if="!allUsers.validEmail" class="invalid">Email is invalid</p>
                    </div>
                  </div>
                  <button
                      v-if="allUsers.mode === 'create'"
                      :disabled="allUsers.disabledSubmitButton"
                      @click="allUsers.addUser"
                      class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem]
                      font-semibold leading-5 text-white hover:bg-indigo-500"
                  >
                    Add user
                  </button>
                </div>
              </div>
              <div class="flex justify-center mb-6">
                <button
                    v-if="!allUsers.mode"
                    @click="allUsers.editUser"
                    class="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem]
                      font-semibold leading-5 text-white hover:bg-indigo-500"
                >
                  Edit user
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
  .invalid {
    color: #f50808;
    font-size: 10px;
  }
</style>