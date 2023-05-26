import React from 'react'

import {
  LightModeOutlinedIcon,
  StarOutlineOutlinedIcon,
  CheckCircleOutlinedIcon,
  HomeOutlinedIcon,
  FormatListBulletedOutlinedIcon,
} from '../../assets/icons'

import { PageTopRow, AddTask, Input, CompletedRow } from '..'

import { PadWrapper, Wrapper } from '../../assets/style/StyledComponent'
// import Sort from '../../Sort'

import { useGlobalContext } from '../../context/context'
const Content = () => {
  const {
    submitHandler,
    completed,
    notCompleted,
    showBottomRow,
    sidebarTitle,
    important,
    allToDo,
    newListArray,
  } = useGlobalContext()
  const generatedList = newListArray.map((item) => {
    return {
      title: item.text,
      logo: <FormatListBulletedOutlinedIcon fontSize='small' />,
      completedRow: {
        listInTop: item.listInTop,
        listInAccordion: item.listInAccordion,
        listInAccordionTitle: 'completed',
        listInTopTitle: 'notCompleted',
        showNotCompleted: true,
      },
    }
  })
  const list = [
    {
      title: 'my day',
      logo: <LightModeOutlinedIcon fontSize='small' />,
      completedRow: {
        listInTop: notCompleted,
        listInAccordion: completed,
        listInAccordionTitle: 'completed',
        listInTopTitle: 'notCompleted',
        title: 'completed',
        showNotCompleted: true,
      },
    },
    {
      title: 'important',
      logo: <StarOutlineOutlinedIcon fontSize='small' />,
      importantFunc: true,
      completedRow: {
        listInTop: important,
        listInAccordion: important,
        listInAccordionTitle: 'important',
        listInTopTitle: 'important',
        title: 'completed',
        showNotCompleted: true,
      },
    },
    {
      title: 'completed',
      logo: <CheckCircleOutlinedIcon fontSize='small' />,
      notShowInput: true,
      completedRow: {
        listInTop: [],
        listInAccordion: completed,
        listInAccordionTitle: 'completed',
        listInTopTitle: '',
        title: 'tasks',
        showNotCompleted: false,
      },
    },
    {
      title: 'tasks',
      logo: <HomeOutlinedIcon fontSize='small' />,
      completedRow: {
        listInTop: allToDo.filter((item) => item.isCompleted === false),
        listInAccordion: allToDo.filter((item) => item.isCompleted === true),
        listInAccordionTitle: 'allToDoCompleted',
        listInTopTitle: 'allToDoNotCompleted',
        title: 'completed',
        showNotCompleted: true,
      },
    },
    ...generatedList.flat(),
  ]

  const {
    title,
    logo,
    notShowInput,
    importantFunc,
    completedRow: {
      listInTop,
      listInAccordion,
      listInTopTitle,
      title: titleCompletedRow,
      listInAccordionTitle,
      showNotCompleted,
    },
  } = list.find((item) => item?.title === sidebarTitle)

  return (
    <>
      <Wrapper>
        <PadWrapper>
          <PageTopRow title={title} logo={logo} />
          {!notShowInput && (
            <Input
              submitHandler={(e) => {
                submitHandler(e, importantFunc)
              }}
            />
          )}
          {showBottomRow && !notShowInput && <AddTask />}
        </PadWrapper>

        <CompletedRow
          listInTop={listInTop}
          listInAccordion={listInAccordion}
          listInAccordionTitle={listInAccordionTitle}
          listInTopTitle={listInTopTitle}
          title={titleCompletedRow}
          showNotCompleted={showNotCompleted}
          showCompleted
        />
        {/* <Sort /> */}
      </Wrapper>
    </>
  )
}

export default Content
