export const capitalMaker = (string) => {
  return string
    .split(' ')
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    .join(' ')
}
export const lengthChecker = (string, width) => {
  if (width <= 800) {
    return string.length > 12 ? `${string.slice(0, 11)} ...` : string
  } else {
    return string.length > 20 ? `${string.slice(0, 19)} ...` : string
  }
}

export const getSidebarTitle = () => {
  let sidebarTitle = localStorage.getItem('sidebarTitle')

  if (
    sidebarTitle === 'my day' ||
    sidebarTitle === 'important' ||
    sidebarTitle === 'completed' ||
    sidebarTitle === 'task'
  ) {
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
export const sortByCreationDate = (a, b) => {
  const valueA = a.createdAt
  const valueB = b.createdAt
  if (valueA > valueB) {
    return -1
  }
  if (valueA < valueB) {
    return 1
  }
  return 0
}
export const sortIsImportant = (a, b) => {
  return a.isImportant === b.isImportant ? 0 : a.isImportant ? -1 : 1
}

// export function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1
//   }
//   return 0
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy)
// }
