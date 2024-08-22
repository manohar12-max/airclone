"use client"

interface MenuItemProps{
    onClick:()=>void;
    label:string;
    
}

//const MenuItem = ({onClick,label}:MenuItemProps) => { is same as below i tink
const MenuItem :React.FC<MenuItemProps> = ({onClick,label}) => {
  return (
    <div onClick={onClick} className='px-4 py-4 hover:bg-neutral-400 transition font-semibold'>
      {label}
    </div>
  )
}

export default MenuItem
