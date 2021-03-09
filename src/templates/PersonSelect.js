import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { DefUserContext } from "../providers/DefaultUserProvider";

const PersonSelect = () => {
  const { theme } = useContext(ThemeContext);
  const { defUser, setDefUser } = useContext(DefUserContext);

  return (
    <select
      value={defUser}
      onChange={(e) => setDefUser(e.target.value)}
      className={`w-2/3 border bg-black bg-opacity-10 border-none text-${theme}-tsec text-base rounded-xl py-2`}
    >
      <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="dudu">
        Dudu
      </option>
      <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="luke">
        Luke
      </option>
      <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="tom">
        Tom
      </option>
      <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="dejvo">
        Dejvo
      </option>
    </select>
  );
};

export default PersonSelect;
