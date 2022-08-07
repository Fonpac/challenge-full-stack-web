<template>
    <main>
        <div class="top-container">
            <v-text-field
                v-model="searchInput"
                label="Digite sua busca"
                hide-details="auto"
            ></v-text-field>
            <v-btn large @click="isOpen = true"> Cadastrar aluno </v-btn>
        </div>
        <div class="table-container">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Registro Acadêmico</th>
                        <th class="text-left">Nome</th>
                        <th class="text-left">CPF</th>
                        <th class="text-left">BOTOES</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in computedStudents" :key="item.ra">
                        <td>{{ item.ra }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.cpf }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import studentApi from '@/api'

export interface StudentDto {
    id: number
    name: string
    email: string
    ra: string
    cpf: string
}

const searchInput = ref('')
const students = ref<StudentDto[]>([])

const getStudents = async () => {
    let response = await studentApi.get('/student')
    students.value = response.data as StudentDto[]
}

const computedStudents = computed(() => {
    return students.value.filter((student) => {
        return (
            student.name.includes(searchInput.value) ||
            student.email.includes(searchInput.value) ||
            student.ra.includes(searchInput.value)
        )
    })
})

onMounted(() => {
    getStudents()
})
</script>

<style lang="scss">
main {
    padding: 16px 32px;

    .top-container {
        display: flex;
        gap: 32px;
        margin-bottom: 24px;
        button {
            height: 54px !important;
        }
    }

    .table-container {
    }
}
</style>
