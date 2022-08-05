/* MIHIR SHETH | 23-07-2022 */

import { useState } from "react";

function useToken() {
  // gets the token that the API stores in the session storage and converts it into string
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  // sets the token value to the one received from the API
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}

export default useToken;
