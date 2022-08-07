<template>
    <v-alert v-if="hasError" type="error">Algum campo falta preenchimento</v-alert>

    <main>
        <div class="form">
            <InputVue v-model="name" title="Nome" text="Informe o nome completo" />
            <InputVue v-model="email" title="E-mail" text="Informe apenas um e-mail" />
            <InputVue v-model="ra" title="RA" text="Informe o registro acadêmico" />
            <InputVue v-model="cpf" title="CPF" text="Informe o número do documento" />
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
import { useRouter } from 'vue-router'
const router = useRouter()

const name = ref('')
const email = ref('')
const cpf = ref('')
const ra = ref('')

const hasError = ref(false)
const loading = ref(false)

const formValid = computed(() => {
    return name.value && email.value && cpf.value && ra.value
})

const createStudent = async () => {
    if (!formValid.value) {
        hasError.value = true
    } else {
        hasError.value = false
    }

    loading.value = true

    const response = await studentApi.post('/student', {
        name: name.value,
        email: email.value,
        cpf: cpf.value,
        ra: ra.value
    })

    if (response.data && response.data.id) {
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
