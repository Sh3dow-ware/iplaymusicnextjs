import { useState, useRef } from 'react'
import './Timeline.sass'

export const Timeline = () => {
  const [value, setValue] = useState(50)
  const ref = useRef<HTMLInputElement>(null)

  return (
      <div className="timeline">
        <div className="timeline__track">
          <div
              className="timeline__progress"
              style={{ width: `${value}%` }}
          />
          <div
              className="timeline__knob"
              style={{ left: `calc(${value}% - 12px)` }}
          />
        </div>

        <input
            ref={ref}
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="timeline__input"
        />
      </div>
  )
}
