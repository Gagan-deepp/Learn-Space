"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import Image from 'next/image'
import { actionsDropdownItems } from '@/lib/constants'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'

const ActionDropDown = ({ isAllow }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState(null);
  const filteredActions = actionsDropdownItems.filter((item) => !(item.value === "delete" && !isAllow))

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    // setName(file.name);
    //   setEmails([]);
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>

          {/* {value === "details" && <FileDetails file={file} />} */}
          {/* {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )} */}
          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete the thread
            </p>
          )}
        </DialogHeader>
        {["info", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button className="modal-submit-button">
              <p className="capitalize">{value}</p>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };


  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen} >
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
          {filteredActions.map((actionItem) => (
            <DropdownMenuItem key={actionItem.value} className="shad-dropdown-item"
              onClick={(e) => {
                e.preventDefault(); // Prevent default action
                e.stopPropagation();
                setAction(actionItem);
                if (
                  ["share", "delete", "details"].includes(
                    actionItem.value,
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              <div className="flex items-center gap-2 z-[500]">
                <Image src={actionItem.icon} alt={actionItem.label} width={30} height={30} />
                {actionItem.label}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog >
  )
}
export default ActionDropDown