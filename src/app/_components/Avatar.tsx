"use client"
import React from 'react'
import Image from 'next/image'
interface AvatarProps{
src : string | null | undefined
}
const Avatar:React.FC<AvatarProps> = ({src}) => {
  return (
    <Image
    alt='avatar'
    height="30"
    width="30"
    className='rounded-full'
     src={src||"/images/user.png"}
    />
  )
}

export default Avatar
