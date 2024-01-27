import axios from 'axios'
import { defineStore } from 'pinia'
import { reactive, computed, toRaw, ref }  from 'vue'

export const usersInfo = defineStore('usersInfo', () => {
    const users = reactive([])
    let searchResult = reactive([])
    const showDetailsModal = ref(false)
    const userName = ref('')
    const userEmail = ref('')
    const userAvatar = ref('')
    const userId = ref(0)
    const mode = ref('')
    const searchValue = ref('')
    const phoneNumber = ref('')
    const address = ref('')
    const validEmail = ref(Boolean)
    async function getUsers() {
        const result = await axios.get('https://reqres.in/api/users')

        users.push(...result.data.data)
    }

    async function addUser() {
        try {
            const result = await axios.post('https://reqres.in/api/users', {
                full_name: userName.value,
                email: userEmail.value
            })

            const newUser = {
                full_name: result.data.full_name,
                email: result.data.email
            }
            users.push(newUser)
            showDetailsModal.value = false
        } catch (e) {
            console.error(e)
        }
    }

    async function deleteUser(id) {
        try {
            await axios.delete('https://reqres.in/api/users')

            const index = users.findIndex(user => user.id === id)
            users.splice(index, 1)
        } catch (e) {
            console.error(e)
        }
    }

    async function editUser() {
        try {
            const userData = {}
            if (userName.value) userData.first_name = userName.value
            if (userEmail.value) userData.email = userEmail.value
            await axios.put(`https://reqres.in/api/users/${userId.value}`, userData)
            showDetailsModal.value = false
        } catch (e) {
            console.error(e)
        }
    }

    const getUsersInfo = computed(() => {
        if (searchValue.value) {
            return reactive(toRaw(searchResult))
        } else {
            return reactive(toRaw(users))
        }
    })

    function showUserDetailesModal(name, email, avatar, id) {
        mode.value = ''
        showDetailsModal.value = !showDetailsModal.value
        userName.value = name
        userEmail.value = email
        userAvatar.value = avatar
        userId.value = id
    }

    function addUserModal() {
        mode.value = 'create'
        showDetailsModal.value = !showDetailsModal.value
    }

    function searchUsers() {
        const usersList = reactive(toRaw(users))
        searchResult = usersList.filter(user => user.first_name.toLowerCase().includes(searchValue.value))
    }

    function filterBy(filterType) {
       filterType === 'name'
           ? reactive(toRaw(users.sort((a, b) => b.first_name.localeCompare(a.first_name))))
           : reactive(toRaw(users.sort((a, b) => b.email.localeCompare(a.email))))
    }

    function validateEmail() {
        validEmail.value = /^[^@]+@\w+(\.\w+)+\w$/.test(userEmail.value)
    }

    const disabledSubmitButton = computed(() => {
        return userName.value && userEmail.value
    })

    return {
        getUsers,
        getUsersInfo,
        users,
        userName,
        userEmail,
        userAvatar,
        showDetailsModal,
        showUserDetailesModal,
        mode,
        addUserModal,
        addUser,
        deleteUser,
        searchValue,
        searchUsers,
        filterBy,
        address,
        phoneNumber,
        editUser,
        validEmail,
        validateEmail,
        disabledSubmitButton
    }
})
