<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="id"
      class="flex text-sm font-semibold text-gray-200 items-center gap-2"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500 text-xs"
      >*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full px-4 py-3 bg-gray-800/60 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200',
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-700 focus:ring-red-600 focus:border-transparent',
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-900/30' : 'hover:border-gray-600',
          success ? 'border-green-500' : ''
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >
      <div
        v-if="error"
        class="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Icon
          name="lucide:alert-circle"
          class="w-5 h-5 text-red-500"
        />
      </div>
      <div
        v-if="success && !error"
        class="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Icon
          name="lucide:check-circle"
          class="w-5 h-5 text-green-500"
        />
      </div>
    </div>
    <p
      v-if="error"
      class="text-xs text-red-400 flex items-center gap-1"
    >
      <Icon
        name="lucide:info"
        class="w-3 h-3"
      />
      {{ error }}
    </p>
    <p
      v-if="hint && !error"
      class="text-xs text-gray-400"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  success?: boolean
  hint?: string
  id?: string
}>(), {
  type: 'text',
  disabled: false,
  required: false,
  success: false
})

defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
  'focus': []
}>()

const id = computed(() => props.id || `input-${Math.random().toString(36).substring(7)}`)
</script>
