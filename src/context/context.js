import React, { useState, useEffect, useContext } from 'react'

import useSound from 'use-sound'
import sound from '../assets/sound/doneSound.mp3'
import { db } from '../firebase'
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore'

import { getDarkMode, getSidebarTitle } from '../func/functions'
const ToDoContext = React.createContext()

const MicrosoftTodoProvider = ({ children }) => {
  const [showBottomRow, setShowBottomRow] = useState(false)
  //sound
  const [play] = useSound(sound)

  const [mainSearchValue, setMainSearchValue] = useState()
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false)

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

  //add todo
  const [inputText, setInputText] = useState('')
  const [notCompleted, setNotCompleted] = useState([])
  const [completed, setCompleted] = useState([])
  const [important, setImportant] = useState([])

  const [allToDo, setAllToDo] = useState([])
  const [information, setInformation] = useState({})

  const [toDoIsLoading, setToDoIsLoading] = useState(true)

  const todoCollectionRef = collection(db, 'ToDo')

  //add todo to firebase
  const submitHandler = async (e, special) => {
    e.preventDefault()
    if (inputText.length !== 0) {
      setInputText('')
      await addDoc(todoCollectionRef, {
        text: inputText,
        isCompleted: false,
        isImportant: special ? true : false,
        note: '',
        createdAt: new Date().getTime().toString(),
      })
      getTodo()
    }
  }

  //get todo from firebase
  const getTodo = async () => {
    setToDoIsLoading(true)
    const data = await getDocs(todoCollectionRef)

    const ToDos = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    setAllToDo(ToDos)
    setNotCompleted(ToDos.filter((item) => item.isCompleted === false))
    setCompleted(ToDos.filter((item) => item.isCompleted === true))
    setImportant(ToDos.filter((item) => item.isImportant === true))
    setToDoIsLoading(false)
  }

  //have problems
  const findInformation = async (id) => {
    const specificItem = allToDo.find((item) => item.id === id)
    setInformation(specificItem)

    getTodo()
  }

  const setAsCompleted = async (id) => {
    const specificItem = doc(db, 'ToDo', id)
    await updateDoc(specificItem, { isCompleted: true })
    play()
    getTodo()
  }
  const setAsNotCompleted = async (id) => {
    const specificItem = doc(db, 'ToDo', id)
    await updateDoc(specificItem, { isCompleted: false })
    getTodo()
  }

  const setAsImportant = async (id) => {
    const specificItem = doc(db, 'ToDo', id)
    await updateDoc(specificItem, { isImportant: true })
    getTodo()
  }
  const setAsNotImportant = async (id) => {
    const specificItem = doc(db, 'ToDo', id)
    await updateDoc(specificItem, { isImportant: false })
    getTodo()
  }

  const deleteHandler = async (id) => {
    const specificItem = doc(db, 'ToDo', id)
    await deleteDoc(specificItem)
    getTodo()
  }

  //most develop

  const clearInputHandler = () => {
    setInputText('')
    setMainSearchValue('')
  }

  //for responsively
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const resize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [width, height])

  useEffect(() => {
    localStorage.setItem('sidebarTitle', JSON.stringify(sidebarTitle))
  }, [sidebarTitle])

  //set dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem('darkMode', isDarkMode)
  }, [isDarkMode])

  //get todo initially
  useEffect(() => {
    getTodo()
    // eslint-disable-next-line
  }, [])
  return (
    <ToDoContext.Provider
      value={{
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
        submitHandler,
        inputText,
        setInputText,
        clearInputHandler,
        setAsCompleted,
        setAsNotCompleted,
        setAsImportant,
        setAsNotImportant,
        important,
        play,
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
        toDoIsLoading,
        allToDo,
        showBottomRow,
        setShowBottomRow,
      }}>
      {children}
    </ToDoContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(ToDoContext)
}

export { MicrosoftTodoProvider, useGlobalContext }
