import {AnimatePresence, motion} from 'framer-motion'
import type {AccordionItem as AccordionItemType} from '@/lib/types/accordion.types'
import {adjustColor} from '@/lib/colorUtils'
import {accordionVariants, containerVariants, itemVariants} from './accordionAnimations'
import {ChevronRight, Ellipsis} from 'lucide-react'
import './Accordion-Item.sass'

interface AccordionItemProps {
  item: AccordionItemType
  index: number
  isOpen: boolean
  toggleAccordion: (index: number) => void
}

export const AccordionItem = ({
                                item,
                                index,
                                isOpen,
                                toggleAccordion
                              }: AccordionItemProps) => {
  return (
      <motion.div
          className="accordion-item"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: [0.04, 0.62, 0.23, 0.98]
          }}
      >
        <motion.div
            className="accordion-header"
            style={{
              backgroundImage: `linear-gradient(90deg, ${item.color} 0%, ${adjustColor(item.color, 20)} 100%)`,
              borderRadius: isOpen ? '8px 8px 0 0' : '8px',
              boxShadow: isOpen ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}
            onClick={() => toggleAccordion(index)}
            whileHover={{backgroundPosition: '100% 0%'}}
            whileTap={{scale: 0.98}}
            transition={{duration: 0.4}}
        >
          <span>{item.title}</span>
          <motion.div
              animate={{rotate: isOpen ? 90 : 0}}
              transition={{duration: 0.4}}
          >
            <Ellipsis/>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
              <motion.div
                  className="accordion-body"
                  variants={accordionVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  style={{
                    borderLeft: `2px solid ${item.color}`,
                    borderRight: `2px solid ${item.color}`,
                    borderBottom: `2px solid ${item.color}`
                  }}
              >
                <div className="accordion-content">
                  {item.subItems && item.subItems.length > 0 && (
                      <motion.ul
                          className="sub-list"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                      >
                        {item.subItems.map((subItem, subIndex) => (
                            <motion.li
                                key={subIndex}
                                className="sub-item"
                                variants={itemVariants}
                            >
                              {subItem}
                              <ChevronRight/>
                            </motion.li>
                        ))}
                      </motion.ul>
                  )}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  )
}
