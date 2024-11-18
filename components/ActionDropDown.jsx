import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Dialog } from './ui/dialog'
import Image from 'next/image'
import { actionsDropdownItems } from '@/lib/constants'

const ActionDropDown = () => {
  return (
    <Dialog >
      <DropdownMenu >
        <DropdownMenuTrigger className="shad-no-focus">
          <Image
            src="/icon/dots.svg"
            alt="dots"
            width={34}
            height={34}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-light-400" >

          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem key={actionItem.value} className="shad-dropdown-item"
            // onClick={() => {
            //   setAction(actionItem);

            //   if (
            //     ["rename", "share", "delete", "details"].includes(
            //       actionItem.value,
            //     )
            //   ) {
            //     setIsModalOpen(true);
            //   }
            // }}
            >
              <div className="flex items-center gap-2">
                <Image src={actionItem.icon} alt={actionItem.label} width={30} height={30} />
                {actionItem.label}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
export default ActionDropDown