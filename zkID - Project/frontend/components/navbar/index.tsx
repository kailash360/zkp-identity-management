import React from 'react'
import * as styles from "./style"
import { URL } from '@components/constant'

export interface INavbar {
    address?: string
}

function Navbar(props: INavbar) {
    const { address } = props

    const avatarURL = `${URL.ROBOHASH}${address}`

  return (
    <div className='w-full px-12 py-4' style={styles.navbar}>
        <div className="flex justify-between h-full w-full">
            <p className='text-2xl' style={styles.navbarText}>zkID</p> 
            <div className="flex align-middle">
                <p className='text-sm align-middle my-auto' style={styles.userText}>{address}</p> 
                <div className="w-6 h-6 border border-white bg-white ml-1 my-auto rounded-full relative">
                    <img src={avatarURL} alt="" className="circle w-full h-full object-cover scale-110 absolute rounded-full" style={{top: "-3px"}} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar