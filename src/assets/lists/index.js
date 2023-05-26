import {
  darkMode,
  resizables,
  android,
  apple,
  window,
  outlook,
  loadingTodo,
  clip,
  excel,
  onedrive,
  onenote,
  powerpoint,
  skype,
  word,
  teams,
  calendar,
  people,
  power,
  paint,
  forms,
  bookings,
  kaizala,
  blend,
  solitaire,
} from '../images'

import {
  CampaignOutlinedIcon,
  QuestionMarkOutlinedIcon,
  SettingsOutlinedIcon,
  EmailOutlinedIcon,
  CalendarMonthOutlinedIcon,
  PeopleAltOutlinedIcon,
  AttachmentOutlinedIcon,
  DoneOutlineOutlinedIcon,
  PrintOutlinedIcon,
  ColorLensOutlinedIcon,
  StarBorderOutlinedIcon,
  SwapVertOutlinedIcon,
  MoreTimeOutlinedIcon,
} from '../icons'

export const newsBoxes = [
  {
    img: darkMode,
    text: 'Now you can change to Darkmode theme from settings!',
    btnText: 'Try it',
  },
  {
    img: resizables,
    text: 'Now you can resize your details pane by dragging the edge of the pane!',
    btnText: 'Got it',
  },
]
export const bottomOfNewsBoxes = [apple, window, android]

export const setting = [
  {
    title: 'general',
    data: [
      { label: 'Confirm before deleting', checked: true },
      { label: 'Add new tasks on top', checked: true },
      { label: 'Move starred tasks to top', checked: false },
      { label: 'Play completion sound', checked: false },
      { label: 'Show right-click menus', checked: false },
      { label: 'Turn on reminder notifications', checked: false },
      { label: 'Show tasks that seem important in My Day', checked: false },
      { label: 'Turn on night mode', checked: false },
    ],
  },
  {
    title: 'My day',
    data: [{ label: 'Show potential tasks in My Day', checked: false }],
  },
  {
    title: 'smart lists',
    data: [
      { label: 'important', checked: false },
      { label: 'planned', checked: false },
      { label: 'all', checked: false },
      { label: 'completed', checked: false },
      { label: 'assigned tome', checked: false },
      { label: 'Auto-hide empty smart lists', checked: false },
      { label: 'Show Due Today tasks in My Day', checked: false },
    ],
  },
  {
    title: 'connected apps',
    data: [{ label: 'planner', checked: false }],
  },
  {
    title: 'notifications',
    data: [{ label: 'email', checked: false }],
  },
]

export const microsoftAppsLogo = [
  { text: 'outlook', logo: outlook },
  { text: 'oneDrive', logo: onedrive },
  { text: 'teams', logo: teams },
  { text: 'word', logo: word },
  { text: 'excel', logo: excel },
  { text: 'powerpoint', logo: powerpoint },
  { text: 'oneNote', logo: onenote },
  { text: 'to do', logo: loadingTodo },
  { text: 'people', logo: people },
  { text: 'calendar', logo: calendar },
  { text: 'clipchamp', logo: clip },
  { text: 'power', logo: power },
  { text: 'skype', logo: skype },
]

export const navbarIcons = [
  { title: 'Settings', placement: 'bottom', icon: <SettingsOutlinedIcon /> },
  {
    title: 'help & feedback',
    placement: 'bottom-end',
    icon: <QuestionMarkOutlinedIcon />,
  },
  {
    title: 'What’s news',
    placement: 'bottom-end',
    icon: <CampaignOutlinedIcon />,
  },
]

export const appsExtended = [
  ...microsoftAppsLogo,
  { text: 'paint', logo: paint },
  { text: 'forms', logo: forms },
  { text: 'bookings', logo: bookings },
  { text: 'kaizala', logo: kaizala },
  { text: 'blend', logo: blend },
  { text: 'solitaier', logo: solitaire },
].sort((a, b) => {
  const textOne = a.text
  const TextTwo = b.text
  if (textOne < TextTwo) {
    return -1
  }
  if (textOne > TextTwo) {
    return 1
  }

  return 0
})

export const FiveIconSideBare = [
  { icon: <EmailOutlinedIcon fontSize='small' />, title: 'mail' },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'calendar' },
  { icon: <PeopleAltOutlinedIcon fontSize='small' />, title: 'people' },
  { icon: <AttachmentOutlinedIcon fontSize='small' />, title: 'files' },
  {
    icon: <DoneOutlineOutlinedIcon color='primary' fontSize='small' />,
    title: 'to do',
  },
]

export const optionsValue = [{ icon: <PrintOutlinedIcon />, title: 'print' }]
export const optionsValueInOtherPage = [
  { icon: <ColorLensOutlinedIcon />, title: 'changeTheme' },

  { icon: <PrintOutlinedIcon />, title: 'print' },
]

export const sortValue = [
  {
    icon: <StarBorderOutlinedIcon />,
    title: 'importance',
    sortTitle: 'importance',
  },
  {
    icon: <CalendarMonthOutlinedIcon />,
    title: 'due date',
  },
  {
    icon: <SwapVertOutlinedIcon />,
    title: 'alphabetically',
    sortTitle: 'alphabetically',
  },
  {
    icon: <MoreTimeOutlinedIcon />,
    title: 'creation date',
    sortTitle: 'creationDate',
  },
]
export const sortValueInImportantPage = [
  { icon: <CalendarMonthOutlinedIcon />, title: 'due date' },
  { icon: <StarBorderOutlinedIcon />, title: 'adjust to my day' },
  {
    icon: <SwapVertOutlinedIcon />,
    title: 'alphabetically',
    sortTitle: 'alphabetically',
  },
  {
    icon: <MoreTimeOutlinedIcon />,
    title: 'creation date',
    sortTitle: 'creationDate',
  },
]
export const sortValueInCompletedPageAndTask = [
  {
    icon: <StarBorderOutlinedIcon />,
    title: 'importance',
    sortTitle: 'importance',
  },
  { icon: <CalendarMonthOutlinedIcon />, title: 'due date' },
  { icon: <StarBorderOutlinedIcon />, title: 'adjust to my day' },
  {
    icon: <SwapVertOutlinedIcon />,
    title: 'alphabetically',
    sortTitle: 'alphabetically',
  },
  {
    icon: <MoreTimeOutlinedIcon />,
    title: 'creation date',
    sortTitle: 'creationDate',
  },
]
