'use client'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export default function Button(props: {
  color: ButtonColor
  disabled?: boolean
  icon?: IconProp
  text: string
  onClick?: (router: AppRouterInstance) => void
}) {
  const backgrounds: { [key: string]: string } = {
    primary: 'bg-primary-500',
    warn: 'bg-yellow-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500',
  }

  const outlines: { [key: string]: string } = {
    primary: 'outline-primary-500',
    warn: 'outline-yellow-500',
    green: 'outline-green-500',
    gray: 'outline-gray-500',
  }

  const router = useRouter()

  return (
    <button
      className={`${
        backgrounds[props.color]
      } flex justify-evenly gap-6 mx-auto p-6 rounded-full items-center transition-[outline-offset,outline-width] ${
        outlines[props.color]
      } outline outline-offset-[-1px] outline-4 hover:outline-offset-4 active:outline-offset-[6px] active:outline-2`}
      onClick={() => props.onClick != undefined && props.onClick(router)}
    >
      <div className='text-xl font-bold tracking-wide text-white'>
        {props.text}
      </div>
      {props.icon && (
        <FontAwesomeIcon
          icon={props.icon}
          color='white'
          className='w-8 h-8'
        />
      )}
    </button>
  )
}

export enum ButtonColor {
  Primary = 'primary',
  Warn = 'warn',
  Green = 'green',
  Gray = 'gray',
}
