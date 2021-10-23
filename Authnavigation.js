import React, { useEffect, useState } from "react";
import { firebase } from "./firebase";
import { SignedInStack, SignedOutStack } from "./navigation";
const Authnavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) setCurrentUser(user.uid);
      else setCurrentUser(null);
    });
  }, []);
  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default Authnavigation;
