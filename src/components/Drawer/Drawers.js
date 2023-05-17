import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import { useGlobalContext } from '../../context/context'

import LeftDrawer from './LeftDrawer'
import RightDrawer from './RightDrawer'

const Drawers = () => {
  const { openAnchor, toggleDrawer, rightList, height } = useGlobalContext()
  const list = (anchor) => (
    <Box
      sx={{
        maxHeight: height,
        overflow: 'auto',
        width: `${anchor === 'left' ? '310px' : '350px'}`,
        mt: `${anchor === 'left' ? '0rem' : '3.5rem'}`,
        p: `${
          anchor === 'right' && rightList === 'Settings'
            ? '0rem 0rem 0rem 1rem'
            : anchor === 'right' && height > 850
            ? '0rem 1rem '
            : anchor === 'right' && height < 850 && '0rem 0rem 0 1rem'
        }`,
        mr: `${anchor === 'right' && height < 850 && ' .rem '}`,
      }}
      role='presentation'>
      {anchor === 'left' ? <LeftDrawer /> : <RightDrawer />}
    </Box>
  )

  return (
    <div>
      {['left', 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            sx={{
              zIndex: `${anchor === 'left' ? 20 : 3}`,
            }}
            elevation={anchor === 'left' ? 10 : 3}
            hideBackdrop
            anchor={anchor}
            open={openAnchor[anchor]}
            onClose={
              anchor === 'left'
                ? toggleDrawer(anchor, false)
                : toggleDrawer(anchor, false, '')
            }>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Drawers
