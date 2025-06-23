<template>
    <button
        :class="['base-button', variantClass]"
        :type="type"
        :disabled="disabled"
        @click="$emit('click')"
        >
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

const props = defineProps<{
    type?: 'button' | 'submit' | 'reset'
    variant?: ButtonVariant
    disabled?: boolean
}>()

defineEmits<{
    (e: 'click'): void
}>()

const variantClass = computed(() =>{
    switch (props.variant){
        case 'secondary':
            return 'base-button--secondary'
        case 'danger':
            return 'base-button--danger'
        default:
            return 'base-button--primary'
    }
})
</script>

<style scoped>
.base-button{
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease;
    color: white;
}
.base-button--primary{
    background-color: #3b82f6;
}
.base-button--secondary{
    background-color: #6b7280;
}
.base-button--danger{
    background-color: #ef4444;
}
.base-button:disabled{
    opacity: 0.6;
    cursor: not-allowed;
}
</style>