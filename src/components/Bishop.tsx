import React from 'react'
import { observer } from 'mobx-react'

import { useDrag } from 'react-dnd'

import { useGameService } from '../domain/GameServiceProvider'
import { Colors, Square } from '../domain/types'

const Bishop: React.FC<{
  square: Square
  flashingOn: boolean
}> = observer(({
  square,
  flashingOn
}) => {
  const game = useGameService()
  const [{ isDragging, canDrag }, drag] = useDrag(() => ({
    type: 'piece',
    item: {...square},
    canDrag: (monitor) => (
      game.currentTurn() === square.piece!.color
    ),
    collect: (monitor) => ({
      isDragging: game.currentTurn() === square.piece!.color && !!monitor.isDragging(),
      canDrag: monitor.canDrag()
    }),
  }), [square])

  return (
    <div 
      ref={drag}
      style={{
        opacity: (flashingOn) ? (isDragging ? 0.5 : 1) : 0.3, 
        cursor: canDrag ? (isDragging ? 'move' : 'pointer') : 'default', 
      }}
    >
      <svg
        width='75px'
        height='75px'
        viewBox="0 0 700 700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fill={square.piece!.color === Colors.white ? '#cbb' : '#322' } 
          d="m442.96 459.2h-1.1211l7.8398-17.359c4.4805-10.078 4.4805-21.84-0.55859-31.922-15.68-31.918-49.281-107.52-60.48-174.72h32.48c12.32 0 21.84-9.5195 21.84-21.84s-9.5195-21.84-21.84-21.84h-24.078c7.2812-10.641 11.762-25.199 11.762-44.238 0-14-5.6016-29.121-12.879-43.121l-31.359 39.199c-2.2383 2.8008-5.6016 4.4805-8.9609 4.4805-2.2383 0-5.0391-0.55859-7.2812-2.2383-5.0391-3.9219-5.6016-11.199-1.6797-15.68l36.398-45.922c-6.7188-8.9609-13.441-17.359-19.039-23.52 6.7188-4.4805 11.199-12.32 11.199-21.281 0-14-11.762-25.762-25.762-25.762s-25.762 11.762-25.762 25.762c0 8.9609 4.4805 16.238 11.199 21.281-17.922 19.602-44.801 55.441-44.801 86.801 0 19.039 4.4805 33.602 11.762 44.238h-22.398c-12.32 0-21.84 9.5195-21.84 21.84s9.5195 21.84 21.84 21.84h32.48c-11.199 66.641-45.359 142.8-60.48 174.72-5.0391 10.078-5.0391 21.84-0.55859 31.922l7.8398 17.359h-1.1211c-28 0-50.961 22.961-50.961 50.961v27.441c0 4.4805 3.9219 8.3984 8.3984 8.3984h271.04c4.4805 0 8.3984-3.9219 8.3984-8.3984v-26.879c-0.55469-28.562-22.957-51.523-51.516-51.523z"
        />

      </svg>
    </div>
  )
})

export default Bishop
