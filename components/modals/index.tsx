import { useState, Fragment, FC, Dispatch } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import DetailModal from './detailModal'
import UploadModal from './uploadModal'
import BidModal from './bidModal'
import { XIcon } from '@heroicons/react/outline'

interface IModal {
  title: string
  description?: string
  children: JSX.Element
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
}

const Modal: FC<IModal> = ({ title, description, children, isOpen, setIsOpen }) => {
  //   const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between items-center">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </Dialog.Title>
                  <a
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer bg-gray-100 w-10 h-10 rounded-full
                  flex items-center justify-center
                  ">
                    <XIcon className="w-5 h-5" />
                  </a>
                </div>
                {description ? <Dialog.Description>{description}</Dialog.Description> : null}
                <div className="mt-2">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { Modal as default, UploadModal, DetailModal, BidModal }
