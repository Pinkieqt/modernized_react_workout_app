import React, { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [pass, setPass] = useState("");

  return (
    <div className={`flex flex-col justify-end items-center w-full min-h-screen p-4 bg-${theme}-bg text-${theme}-tpr`}>
      <div className="w-full my-3">
        <div className="text-5xl my-14">
          <p>Vítej</p>
          <p>zpátky!</p>
        </div>
        <label className={`text-left text-${theme}-tter`}>Heslo pro přístup do aplikace</label>
      </div>
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
        className={`w-full p-3 mb-3 rounded-xl bg-${theme}-elev focus:outline-none focus:ring-2 focus:ring-${theme}-primary focus:border-transparent`}
      ></input>

      {/* Checkbox */}
      <label className="inline-flex items-center mb-10">
        <input type="checkbox" className="h-5 w-5 text-red-600 " value="staySignedIn" onChange={() => setStaySignedIn(!staySignedIn)}></input>
        <span className={`text-${theme}-tsec ml-3`}> Zůstat v aplikaci přihlášen?</span>
      </label>
      <button className={`bg-${theme}-primary text-white w-full text-lg p-3 rounded-xl font-semibold mb-6`}>Přihlásit</button>
    </div>
  );
};

export default Login;
