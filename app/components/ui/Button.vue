<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'px-4 py-2 rounded-lg font-semibold transition',
      variant === 'primary' ? 'bg-red-600 hover:bg-red-500 text-white' : 'border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800',
      disabled && 'opacity-50 cursor-not-allowed',
      className
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  variant?: 'primary' | 'secondary'
  className?: string
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  variant: 'primary',
  className: ''
})
</script>
