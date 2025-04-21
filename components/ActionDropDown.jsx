"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import Image from 'next/image'
import { actionsDropdownItems } from '@/lib/constants'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { deleteThread } from '@/lib/actions'
import { Check, Copy, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from './ui/input'

const ActionDropDown = ({ isAllow, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredActions = actionsDropdownItems.filter((item) => !(item.value === "delete" && !isAllow))

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    // setName(file.name);
    //   setEmails([]);
  };

  const handleAction = async (e) => {
    e.preventDefault(); // Prevent default action
    e.stopPropagation();
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      delete: () =>
        deleteThread(id),
    };

    res = await actions[action.value]();
    toast.success(res.message)
    setIsLoading(false);
    if (res) closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent className="shad-dialog button bg-white-1">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>

          {value === "delete" && (
            <p className="delete-confirmation">
              Are you sure you want to delete this thread
            </p>
          )}
          {value === "share" && (
            <div className="flex items-center space-x-2 mt-4">
              <Input readOnly value={`https://learn-space-chi.vercel.app/thread/${id}`} className="flex-1" />
              <Button size="sm" variant="outline" onClick={async () => {
                await navigator.clipboard.writeText(`https://learn-space-chi.vercel.app/thread/${id}`)
                toast.success("Link Copied")
                closeAllModals()
              }} className="px-3">
                <Copy className="size-4" />
              </Button>
            </div>
          )}
        </DialogHeader>
        {["info", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {isLoading && (<LoaderCircle className='animate-spin' />)}
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
                <Image src={actionItem.icon} alt={actionItem.label} quality={50} width={30} height={30} />
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