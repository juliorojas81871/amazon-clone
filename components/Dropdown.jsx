import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut, useSession } from "next-auth/react";

const Dropdown = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Menu as="div">
        <Menu.Button className="link">
          <p>{`Hello, ${session?.user?.name}`}</p>
          <p className="font-extrabold md:text-sm">Account & Lists</p>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute rounded-md bg-yellow-400 w-28 mt-1 origin-top-right shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active && "bg-yellow-500"
                    } group flex rounded-md text-black items-center w-full px-2 py-2 text-sm font-semibold tracking-wide cursor-default`}
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
