'use client'

import clsx from 'clsx'
import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export const PostItemHoverOverlay = () => {
  const [mouseEnter, setMouseEnter] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const $ref = ref.current
    if (!$ref) return
    const $parent = $ref.parentElement
    if (!$parent) return
    $parent.onfocus = () => {
      setMouseEnter(true)
    }

    $parent.onblur = () => {
      setMouseEnter(false)
    }

    return () => {
      $parent.onfocus = null
      $parent.onblur = null
    }
  }, [])
  return (
    <>
      <div
        ref={ref}
        className="absolute inset-0 z-10"
        onMouseEnter={() => {
          setMouseEnter(true)
        }}
        onMouseLeave={() => {
          setMouseEnter(false)
        }}
      />

      <AnimatePresence>
        {mouseEnter && (
          <m.div
            layout
            initial={{
              opacity: 0.2,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            layoutId="post-item-hover-overlay"
            className={clsx(
              'absolute z-[-1] rounded-xl',
              'bg-accent/10 dark:bg-neutral-800',
              'inset-y-4 -left-4 -right-6',
            )}
          />
        )}
      </AnimatePresence>
    </>
  )
}
