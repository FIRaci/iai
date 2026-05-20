export function useTheme() {
  return {
    theme: "light" as const,
    isDark: false,
    isStar: false,
    toggleLightDark: () => {},
    toggleStar: () => {},
    setThemeDirect: () => {},
  }
}
