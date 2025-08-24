import React, { forwardRef } from "react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  active?: boolean
}

const GradientDefs = ({ id }: { id: string }) => (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--color-stop)" }} />
        <stop offset="100%" style={{ stopColor: "var(--color-start)" }} />
      </linearGradient>
    </defs>
)

export const Activity = forwardRef<SVGSVGElement, IconProps>(({ active, ...props }, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#000" : "url(#gradient-activity)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-activity footer-list__item"
        width="24"
        height="24"
        aria-hidden="true"
        {...props}
    >
      <GradientDefs id="gradient-activity" />
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
))
Activity.displayName = "Activity"

export const Mic = forwardRef<SVGSVGElement, IconProps>(({ active, ...props }, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#000" : "url(#gradient-mic)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mic footer-list__item"
        width="24"
        height="24"
        aria-hidden="true"
        {...props}
    >
      <GradientDefs id="gradient-mic" />
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
))
Mic.displayName = "Mic"

export const Wifi = forwardRef<SVGSVGElement, IconProps>(({ active, ...props }, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#000" : "url(#gradient-wifi)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-wifi footer-list__item"
        width="24"
        height="24"
        aria-hidden="true"
        {...props}
    >
      <GradientDefs id="gradient-wifi" />
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
))
Wifi.displayName = "Wifi"

export const Contrast = forwardRef<SVGSVGElement, IconProps>(({ active, ...props }, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#000" : "url(#gradient-contrast)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-contrast footer-list__item"
        width="24"
        height="24"
        aria-hidden="true"
        {...props}
    >
      <GradientDefs id="gradient-contrast" />
      <circle cx="12" cy="12" r="10" />
      <path d="M12 18a6 6 0 0 0 0-12v12z" />
    </svg>
))
Contrast.displayName = "Contrast"

export const Settings = forwardRef<SVGSVGElement, IconProps>(({ active, ...props }, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? "#000" : "url(#gradient-settings)"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-settings footer-list__item"
        width="24"
        height="24"
        aria-hidden="true"
        {...props}
    >
      <GradientDefs id="gradient-settings" />
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
))
Settings.displayName = "Settings"
