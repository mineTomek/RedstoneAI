'use client'

import { faCubes as simulationIcon } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonColor } from './components/Button'
import Footer from './components/Footbar'
import Navbar from './components/Navbar'
import Simulator from './simulation/Simulator'

export default function Home() {
  return (
    <main className=''>
      <Navbar />

      <div className='pr-6 grid md:grid-cols-2 h-[100dvh]'>
        <Simulator
          circuit='tests'
          className='relative after:absolute after:bg-gradient-to-t after:from-gray-100 dark:after:from-gray-950 after:to-transparent after:bottom-0 after:w-full after:h-16'
        />
        <div className='h-[50dvh] md:h-auto text-center flex flex-col gap-12 md:justify-center md:gap-12'>
          <div className='tracking-wider text-lg font-bold'>
            Simulating redstone since... not yet.
          </div>
          <div className='tracking-wider text-lg'>
            A redstone simulator that helps you create better redstone
            contraptions
          </div>
          <Button
            color={ButtonColor.Primary}
            icon={simulationIcon}
            text='Start simulating'
            onClick={router => {
              router.push('/simulator')
            }}
          />
        </div>
        <Footer />
      </div>
    </main>
  )
}
