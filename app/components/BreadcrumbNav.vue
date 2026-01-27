<template>
  <nav class="mb-8 flex items-center gap-1 text-sm">
    <NuxtLink
      to="/"
      class="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-gray-900/40"
      aria-label="Accueil"
    >
      <Icon
        name="lucide:home"
        class="w-4 h-4"
      />
      <span class="font-medium">Accueil</span>
    </NuxtLink>

    <template v-if="items.length > 0">
      <div
        v-for="(item, index) in items.slice(0, -1)"
        :key="index"
        class="flex items-center gap-1.5"
      >
        <Icon
          name="lucide:chevron-right"
          class="w-4 h-4 text-gray-600"
        />
        <component
          :is="item.to ? 'NuxtLink' : 'button'"
          :to="item.to"
          class="text-gray-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-900/40 font-medium"
          @click="item.onClick?.()"
        >
          {{ item.label }}
        </component>
      </div>

      <div class="flex items-center gap-1.5">
        <Icon
          name="lucide:chevron-right"
          class="w-4 h-4 text-gray-600"
        />
        <span class="text-white font-semibold px-2 py-1.5 bg-red-600/10 rounded-lg border border-red-500/20">
          {{ items[items.length - 1].label }}
        </span>
      </div>
    </template>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
  onClick?: () => void
  isActive?: boolean
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>
