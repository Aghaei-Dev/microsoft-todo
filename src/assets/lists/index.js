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
  LightModeOutlinedIcon,
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
  ...optionsValue,
]

export const sortValue = [
  {
    icon: <StarBorderOutlinedIcon fontSize='small' />,
    title: 'importance',
    sortTitle: 'importance',
  },
  {
    icon: <CalendarMonthOutlinedIcon fontSize='small' />,
    title: 'due date',
  },
  {
    icon: <SwapVertOutlinedIcon fontSize='small' />,
    title: 'alphabetically',
    sortTitle: 'alphabetically',
  },
  {
    icon: <MoreTimeOutlinedIcon fontSize='small' />,
    title: 'creation date',
    sortTitle: 'creationDate',
  },
]
export const sortValueInImportantPage = [
  ...sortValue.slice(1, 2),
  {
    icon: <LightModeOutlinedIcon fontSize='small' />,
    title: 'adjust to my day',
  },
  ...sortValue.slice(2, 4),
]
export const sortValueInCompletedPageAndTask = [
  ...sortValue.slice(0, 1),
  ...sortValueInImportantPage,
]

export const dueValue = [
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'today' },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'tomorrow' },
  {
    icon: <CalendarMonthOutlinedIcon fontSize='small' />,
    title: 'next week',
    divider: true,
  },
  {
    icon: <CalendarMonthOutlinedIcon fontSize='small' />,
    title: 'pick a date',
  },
]
export const reminderValue = [
  {
    icon: <CalendarMonthOutlinedIcon fontSize='small' />,
    title: 'later today',
  },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'tomorrow' },
  {
    icon: <CalendarMonthOutlinedIcon fontSize='small' />,
    title: 'next week',
    divider: true,
  },
  {
    icon: <CalendarMonthOutlinedIcon fontSize='small' />,
    title: 'pick a date & time',
  },
]
export const repeatValue = [
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'daily' },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'weekdays' },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'weekly' },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'monthly' },
  { icon: <CalendarMonthOutlinedIcon fontSize='small' />, title: 'yearly' },
]
