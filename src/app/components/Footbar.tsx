import { useEffect, useState } from 'react'

export default function Footer() {
  const [isFaded, setIsFaded] = useState(false)
  const [fadeTimeout, setFadeTimeout] = useState<NodeJS.Timeout>()

  useEffect(() => {
    setFadeTimeout(
      setTimeout(() => {
        setIsFaded(true)
      }, 10 * 1000)
    )
  }, [])

  const handlePointerEnter = () => {
    clearTimeout(fadeTimeout)
    setIsFaded(true)
  }

  return (
    <div
      className='h-16 w-[100dvw] text-gray-800 dark:text-gray-300 transition-opacity delay-1000 cursor-default'
      style={{ opacity: isFaded ? 0.3 : 1 }}
      onPointerEnter={handlePointerEnter}
    >
      NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH
      MOJANG OR MICROSOFT
    </div>
  )
}
