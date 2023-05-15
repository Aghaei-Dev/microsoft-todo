import React, { useState, useEffect, useContext } from 'react'

import useSound from 'use-sound'
import sound from '../assets/sound/doneSound.mp3'
// import axios from 'axios'

import {
  getNotCompleted,
  getDarkMode,
  getCompleted,
  getImportant,
  getSidebarTitle,
} from '../func/functions'
const ToDoContext = React.createContext()

const MicrosoftTodoProvider = ({ children }) => {
  //sound
  const [play] = useSound(sound)

  const [mainSearchValue, setMainSearchValue] = useState()
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false)

  // error
  // const [error, setError] = useState({ show: false, msg: '' })

  //darkMode
  const [isDarkMode, setIsDarkMode] = useState(getDarkMode())

  const toggleDarkMode = () => {
    setIsDarkMode((prevValue) => !prevValue)
    document.documentElement.classList.toggle('dark-mode')
  }
  const print = () => {
    console.log('print')
  }
  //left and right Drawer in the NAVBAR
  const [openAnchor, setOpenAnchor] = useState({ left: false, right: false })
  const [rightList, setRightList] = useState('')
  const [leftList, setLeftList] = useState('apps')

  const toggleDrawer = (anchor, open, list) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    if (list !== undefined && anchor === 'right') {
      setRightList(list)
    }
    if (list !== undefined && anchor === 'left') {
      setLeftList(list)
    }

    setOpenAnchor({ ...openAnchor, [anchor]: open })
  }

  //left sidebar
  const [sidebarTitle, setSidebarTitle] = useState(getSidebarTitle())
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  //right sidebar
  const [rightSideBarOpen, setRightSideBarOpen] = useState(false)

  const handleRightSideBarOpen = () => {
    setRightSideBarOpen(true)
  }
  const handleRightSideBarClose = () => {
    setRightSideBarOpen(false)
  }
  const [information, setInformation] = useState()

  const findInformation = (id) => {
    const specificItem = all.find((item) => item.id === id)
    // return specificItem.text
    setInformation(specificItem)
  }
  //add todo
  const [inputText, setInputText] = useState('')
  const [notCompleted, setNotCompleted] = useState(getNotCompleted())
  const [completed, setCompleted] = useState(getCompleted())
  const [important, setImportant] = useState(getImportant())
  const all = [...notCompleted, ...completed]

  const ordinarySubmit = (e) => {
    e.preventDefault()
    if (inputText.length !== 0) {
      setNotCompleted([
        {
          id: new Date().getTime().toString(),
          text: inputText,
          isCompleted: false,
          isImportant: false,
          note: '',
        },
        ...notCompleted,
      ])
    }
    setInputText('')
  }
  const specialSubmit = (e) => {
    e.preventDefault()
    if (inputText.length !== 0) {
      setNotCompleted([
        {
          id: new Date().getTime().toString(),
          text: inputText,
          isCompleted: false,
          isImportant: true,
        },
        ...notCompleted,
      ])
    }
    setInputText('')
  }

  const setAsCompleted = (id) => {
    const newNotCompleted = notCompleted.filter((item) => item.id !== id)
    const specificItem = notCompleted.find((item) => item.id === id)
    specificItem.isCompleted = true
    setNotCompleted(newNotCompleted)
    setCompleted([specificItem, ...completed])
    play()
  }
  const setAsNotCompleted = (id) => {
    const newCompleted = completed.filter((item) => item.id !== id)
    const specificItem = completed.find((item) => item.id === id)
    specificItem.isCompleted = false
    setCompleted(newCompleted)
    setNotCompleted([specificItem, ...notCompleted])
  }

  const toggleImportant = (id) => {
    const newArray = all.filter((item) => item.id !== id)

    const specificItem = all.find((item) => item.id === id)
    specificItem.isImportant = !specificItem.isImportant
    const NotCompletedItems = newArray.filter(
      (item) => item.isCompleted === false
    )
    const completedItems = newArray.filter((item) => item.isCompleted === true)

    if (specificItem.isCompleted) {
      if (specificItem.isImportant) {
        setCompleted([specificItem, ...completedItems])
      } else {
        setCompleted([...completedItems, specificItem])
      }
    } else {
      if (specificItem.isImportant) {
        setNotCompleted([specificItem, ...NotCompletedItems])
      } else {
        setNotCompleted([...NotCompletedItems, specificItem])
      }
    }
    setImportant([specificItem, ...important])
  }

  const deleteHandler = (id) => {
    const newArray = all.filter((item) => item.id !== id)
    const completedItems = newArray.filter((item) => item.isCompleted === true)
    const NotCompletedItems = newArray.filter(
      (item) => item.isCompleted === false
    )
    setCompleted(completedItems)
    setNotCompleted(NotCompletedItems)
  }

  const clearInputHandler = () => {
    setInputText('')
    setMainSearchValue('')
  }
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const resize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  //set size of window
  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  })

  // set to local storage
  useEffect(() => {
    localStorage.setItem('notCompleted', JSON.stringify(notCompleted))
    localStorage.setItem('completed', JSON.stringify(completed))
    localStorage.setItem('important', JSON.stringify(important))

    localStorage.setItem('sidebarTitle', JSON.stringify(sidebarTitle))
  }, [notCompleted, completed, important, sidebarTitle])

  //set dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  return (
    <ToDoContext.Provider
      value={{
        // error,
        print,
        isLoading,
        isDarkMode,
        toggleDarkMode,
        openAnchor,
        toggleDrawer,
        setOpenAnchor,
        rightList,
        setRightList,
        leftList,
        setLeftList,
        sidebarTitle,
        setSidebarTitle,
        open,
        handleDrawerOpen,
        handleDrawerClose,
        notCompleted,
        completed,
        ordinarySubmit,
        inputText,
        setInputText,
        clearInputHandler,
        setAsCompleted,
        setAsNotCompleted,
        toggleImportant,
        important,
        play,
        specialSubmit,
        width,
        height,
        mainSearchValue,
        setMainSearchValue,
        rightSideBarOpen,
        handleRightSideBarOpen,
        handleRightSideBarClose,
        findInformation,
        information,
        deleteHandler,
      }}>
      {children}
    </ToDoContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(ToDoContext)
}

export { MicrosoftTodoProvider, useGlobalContext }
