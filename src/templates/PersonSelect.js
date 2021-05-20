import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { DefUserContext } from "../providers/DefaultUserProvider";
import { Listbox } from "@headlessui/react";
import { IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";

const people = [
  { keyval: "dudu", name: "Dudu" },
  { keyval: "luke", name: "Luke" },
  { keyval: "tom", name: "Tom" },
  { keyval: "dejvo", name: "Dejvo" },
];

const PersonSelect = () => {
  const { theme } = useContext(ThemeContext);
  const { defUser, setDefUser } = useContext(DefUserContext);

  return (
    <div className="w-full mb-2">
      <Listbox value={defUser} onChange={setDefUser}>
        <div className="relative mt-1">
          <Listbox.Button
            className={`w-full flex flex-row justify-between items-center px-5 py-2 border bg-black bg-opacity-10 border-none text-${theme}-tsec rounded-xl`}
          >
            <span className="capitalize">{defUser}</span>
            <span>
              <IoChevronDownOutline size="1.4em" />
            </span>
          </Listbox.Button>
          <Listbox.Options
            className={`absolute w-full px-5 py-1 mt-1 overflow-auto bg-${theme}-bg text-${theme}-tsec rounded-xl shadow-lg ring-1 ring-${theme}-primary`}
          >
            {people.map((el) => (
              <Listbox.Option key={el.keyval} value={el.keyval} className="mb-1 cursor-default select-none relative py-2 pl-10 pr-4">
                {({ selected }) => (
                  <div className="cursor-pointer ">
                    {selected ? (
                      <span className={`absolute inset-y-0 left-0 flex items-center`}>
                        <IoCheckmarkOutline className={`text-${theme}-primary`} size="1.4em" />
                      </span>
                    ) : null}
                    <span className={`${selected ? `text-${theme}-primary text-lg` : ""}block truncate`}>{el.name}</span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default PersonSelect;
