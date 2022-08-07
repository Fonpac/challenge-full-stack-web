<template>
    <main>
        <div class="form">
            <InputVue v-model="name" title="Nome" text="Informe o nome completo" />
            <InputVue v-model="email" title="E-mail" text="Informe apenas um e-mail" />
        </div>
        <div class="buttons">
            <v-btn color="error" :loading="loading" @click="$router.push('/')">Cancelar</v-btn>
            <v-btn color="success" :loading="loading" @click="createStudent">Salvar</v-btn>
        </div>
    </main>
</template>

<script setup lang="ts">
import studentApi from '@/api'
import InputVue from '@/components/Input.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const id = ref(route.query.id as string)
const name = ref(route.query.name as string)
const email = ref(route.query.email as string)

const hasError = ref(false)
const loading = ref(false)

const formValid = computed(() => {
    return name.value && email.value
})

const createStudent = async () => {
    if (!formValid.value) {
        hasError.value = true
    } else {
        hasError.value = false
    }

    loading.value = true

    const response = await studentApi.patch('/student/' + id.value, {
        name: name.value,
        email: email.value
    })

    if (response.data && response.data.id == id.value) {
        router.push('/')
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-wrap: wrap;
}
.buttons {
    float: right;
    display: flex;
    gap: 16px;
    button span {
        color: white;
    }
}
</style>
