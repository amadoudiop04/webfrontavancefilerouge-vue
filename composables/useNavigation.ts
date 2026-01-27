import { ref } from 'vue'

export const useNavigation = () => {
  const activeTab = ref<string>('dashboard')
  const isTransitioning = ref(false)

  const navigateTo = (tab: string) => {
    if (tab === activeTab.value) return

    isTransitioning.value = true
    setTimeout(() => {
      activeTab.value = tab
      isTransitioning.value = false
    }, 200)
  }

  const getTabLabel = (tab: string): string => {
    const labels: Record<string, string> = {
      dashboard: 'Dashboard',
      fighters: 'Fighters',
      athletes: 'Athletes'
    }
    return labels[tab] || tab
  }

  return {
    activeTab,
    isTransitioning,
    navigateTo,
    getTabLabel
  }
}
