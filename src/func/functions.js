export const capitalMaker = (string) => {
  return string
    .split(' ')
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    .join(' ')
}

export const getNotCompleted = () => {
  let notCompleted = localStorage.getItem('notCompleted')

  if (notCompleted) {
    return JSON.parse(localStorage.getItem('notCompleted'))
  } else {
    return []
  }
}
export const getCompleted = () => {
  let completed = localStorage.getItem('completed')

  if (completed) {
    return JSON.parse(localStorage.getItem('completed'))
  } else {
    return []
  }
}
export const getImportant = () => {
  let important = localStorage.getItem('important')

  if (important) {
    return JSON.parse(localStorage.getItem('important'))
  } else {
    return []
  }
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
