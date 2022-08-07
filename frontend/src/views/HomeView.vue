<template>
    <v-alert v-if="deleteSuccess" type="success"> Aluno deletado com sucesso </v-alert>
    <v-alert v-if="deleteFailed" type="error">
        Houve um problema ao deletar o aluno, tente novamente
    </v-alert>
    <main>
        <div class="top-container">
            <v-text-field
                v-model="searchInput"
                label="Digite sua busca"
                hide-details="auto"
            ></v-text-field>
            <v-btn large @click="$router.push('/create')"> Cadastrar aluno </v-btn>
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
                        <td>
                            <div style="display: flex; gap: 8px">
                                <v-btn color="error" @click="deleteStudent(item.id)">excluir</v-btn>
                                <v-btn color="info" @click="editStudent(item)">editar</v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import studentApi from '@/api'
import { useRouter } from 'vue-router'

export interface StudentDto {
    id: number
    name: string
    email: string
    ra: string
    cpf: string
}

const router = useRouter()
const searchInput = ref('')
const deleteSuccess = ref(false)
const deleteFailed = ref(false)
const students = ref<StudentDto[]>([])

const getStudents = async () => {
    const response = await studentApi.get('/student')
    students.value = response.data as StudentDto[]
}

const deleteStudent = async (id: number) => {
    const response = await studentApi.delete('/student/' + id)
    if (response.data && response.data.id == id) {
        deleteSuccess.value = true
        setTimeout(() => {
            deleteSuccess.value = false
        }, 3600)
        getStudents()
    } else {
        deleteFailed.value = true
        setTimeout(() => {
            deleteFailed.value = false
        }, 3600)
    }
}

const editStudent = (student: StudentDto) => {
    router.push(`/edit?id=${student.id}&name=${student.name}&email=${student.email}`)
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
