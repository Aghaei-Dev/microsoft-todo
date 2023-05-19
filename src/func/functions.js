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

export const sortAlphabetically = (a, b) => {
  const textA = a.text.toUpperCase()
  const textB = b.text.toUpperCase()
  if (textA < textB) {
    return -1
  }
  if (textA > textB) {
    return 1
  }
  return 0
}
export const sortCreationDate = (a, b) => {
  const textA = a.createdAt
  const textB = b.createdAt
  if (textA < textB) {
    return -1
  }
  if (textA > textB) {
    return 1
  }
  return 0
}
export const sortIsImportant = (a, b) => {
  return a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1
}
