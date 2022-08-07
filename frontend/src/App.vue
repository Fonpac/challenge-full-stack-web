<template>
    <v-app>
        <component v-bind:is="layout"></component>
    </v-app>
</template>

<script lang="ts">
import DefaultVue from './layouts/Default.vue'

export default {
    computed: {
        layout() {
            return DefaultVue
        }
    }
}
</script>
