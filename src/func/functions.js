export const capitalMaker = (string) => {
  return string
    .split(' ')
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    .join(' ')
}

export const getSidebarTitle = () => {
  let sidebarTitle = localStorage.getItem('sidebarTitle')

  if (sidebarTitle) {
    return JSON.parse(localStorage.getItem('sidebarTitle'))
  } else {
    return 'my day'
  }
}

export const getDarkMode = () => {
  let darkMode = localStorage.getItem('darkMode')

  if (darkMode) {
    return JSON.parse(localStorage.getItem('darkMode'))
  } else {
    return ''
  }
}
