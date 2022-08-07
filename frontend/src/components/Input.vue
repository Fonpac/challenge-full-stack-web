<template>
    <div class="input-container">
        <div class="input-label">
            {{ title }}
        </div>
        <v-text-field :label="text" v-model="value"></v-text-field>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface inputProps {
    title: string
    text: string
    modelValue: string
}

const props = defineProps<inputProps>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
})
</script>

<style lang="scss" scoped>
.input-container {
    display: flex;
    width: 100%;

    .input-label {
        height: 56px;
        background-color: lightgrey;
        width: 96px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid grey;
    }
}
</style>
