import {
  Activity,
  Contrast,
  Mic,
  Settings,
  Wifi,
} from "@/lib/IconsUtils"
import { type LucideIcon} from  "lucide-react"

export type RoutePath =
    | "/featured"
    | "/categories"
    | "/playlist"
    | "/settings"
    | "/radio"
    | "/artist"

export type IconKey = "Activity" | "Mic" | "Wifi" | "Contrast" | "Settings"

export type IconPathMap = Record<IconKey, RoutePath[]>

export const ICON_PATHS: IconPathMap = {
  Activity: ["/categories", "/artist"],
  Mic: ["/featured"],
  Wifi: ["/radio"],
  Contrast: ["/playlist"],
  Settings: ["/settings"],
}

export const ICONS: Record<IconKey, LucideIcon> = {
  Activity,
  Mic,
  Wifi,
  Contrast,
  Settings,
}
