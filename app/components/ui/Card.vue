<template>
  <div :class="['rounded-lg border border-gray-800 bg-linear-to-br from-gray-900/50 to-black/50 overflow-hidden', className]">
    <div
      v-if="$slots.header"
      class="border-b border-gray-800/50 px-6 py-4"
    >
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="border-t border-gray-800/50 px-6 py-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  className?: string
}

withDefaults(defineProps<Props>(), {
  className: ''
})
</script>
