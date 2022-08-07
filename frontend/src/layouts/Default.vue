<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <div class="navbar">
                <v-img :src="require('../assets/logo.png')" class="my-3" contain height="44" />
                <div class="mt-6">
                    <div @click="subMenuOpen = !subMenuOpen" class="item">
                        <span> Modulo Academico </span>
                        <v-icon large color="white">
                            {{ subMenuOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </v-icon>
                        <span></span>
                    </div>
                    <div v-if="subMenuOpen">
                        <div
                            class="subitem"
                            @click="$router.push('/')"
                            :class="{ selected: path == '/' }"
                        >
                            Alunos
                        </div>
                        <div
                            class="subitem"
                            @click="$router.push('/create')"
                            :class="{ selected: path == '/create' }"
                        >
                            Novo aluno
                        </div>
                    </div>
                </div>
            </div>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>
                {{ path == '/' ? 'Consulta de alunos' : 'Cadastro de aluno' }}</v-toolbar-title
            >
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const drawer = ref(true)
const subMenuOpen = ref(true)

const route = useRoute()

const path = computed(() => route.path)
</script>

<style lang="scss">
.navbar {
    .item {
        background-color: grey;
        cursor: pointer;
        height: 48px;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        color: white;
        padding-left: 16px;
        border-bottom: 1px solid white;
    }
    .subitem {
        height: 32px;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightgrey;
        color: black;
        cursor: pointer;
        &.selected {
            color: white;
            background-color: grey;
        }
    }
}
</style>
