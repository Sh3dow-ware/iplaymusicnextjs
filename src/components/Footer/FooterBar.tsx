'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import "@/styles/element/FooterBar.sass"
import { ICON_PATHS, type IconKey, ICONS } from "@/lib/activeIcon"

export const FooterBar = () => {
  const pathname = usePathname()

  return (
      <footer className="footer">
        <nav className="footer-nav">
          <ul className="footer-list">
            {Object.entries(ICON_PATHS).map(([iconKey, routes]) => {
              const Icon = ICONS[iconKey as IconKey]
              if (!Icon) return null

              const isActive = routes.includes(pathname as any)

              return (
                  <li key={iconKey}>
                    <Link href={routes[0]}>
                      <div className="footer-list__items">
                        <Icon
                            className={
                              isActive
                                  ? "footer-list__item footer-list__item--active"
                                  : "footer-list__item"
                            }
                        />
                      </div>
                    </Link>
                  </li>
              )
            })}
          </ul>
        </nav>
      </footer>
  )
}
