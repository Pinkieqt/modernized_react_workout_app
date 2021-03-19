import React, { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { Redirect } from "react-router-dom";
import { signInWithGoogle } from "../utils/Firebase";
import { AuthContext } from "../App";
import Top from "../logo.svg";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [pass, setPass] = useState("");

  //function to sign in
  function signIn() {
    signInWithGoogle(pass, staySignedIn);
  }

  //redirect if currentuser
  const currentUser = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className={`flex flex-col justify-between items-center w-full min-h-screen p-4 bg-${theme}-bg text-${theme}-tpr`}>
      {/* Logo */}
      {theme === "dark" ? (
        <div className="w-36 mt-2 text-center">
          <img src={Top} alt="Logo" />
          <h1 className="uppercase mt-2 font-semibold text-dark-primary">gym journal</h1>
          <h1 className=" text-sm text-dark-tsec">with love by Dudu.</h1>
        </div>
      ) : (
        <div className="w-36 mt-16 text-center">
          <h1 className={`uppercase mt-2 font-semibold text-${theme}-primary`}>gym journal</h1>
          <h1 className={`text-sm text-${theme}-tsec`}>with love by Dudu.</h1>
        </div>
      )}

      {/* Bottom */}
      <div className="w-full">
        <div className="text-5xl my-14">
          <p>Vítej</p>
          <p>zpátky!</p>
        </div>
        <label className={`text-left text-${theme}-tter`}>Heslo pro přístup do aplikace</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
          className={`w-full p-3 mb-3 rounded-xl bg-${theme}-elev focus:outline-none focus:ring-2 focus:ring-${theme}-primary focus:border-transparent`}
        ></input>

        {/* Checkbox */}
        <label className="inline-flex items-center mb-10">
          <input
            type="checkbox"
            className={`form-checkbox bg-${theme}-elev text-${theme}-primary rounded h-5 w-5`}
            value={staySignedIn}
            onChange={() => setStaySignedIn(!staySignedIn)}
          ></input>
          <span className={`text-${theme}-tsec ml-3`}> Zůstat v aplikaci přihlášen?</span>
        </label>
        <button onClick={() => signIn()} className={`bg-${theme}-primary text-${theme}-bg w-full text-lg p-3 rounded-xl font-semibold mb-3`}>
          Přihlásit
        </button>
      </div>
    </div>
  );
};

export default Login;
