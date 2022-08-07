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
                        <div class="subitem">Alunos</div>
                    </div>
                </div>
            </div>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>Consulta de alunos</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({ drawer: true, subMenuOpen: true })
}
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
    }
    .subitem {
        height: 32px;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightgrey;
        color: black;
    }
}
</style>
