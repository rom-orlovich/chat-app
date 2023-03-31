import React from "react";

import InputLabel from "../../components/Inputs/InputLabel/InputLabel";

import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import LoginCard from "../../components/LoginCard/LoginCard";

const homePageStyle = {
  pageContainer:
    "w-[100vw] h-[100vh] bg-homeBackground flex items-center justify-center ",
};

function HomePage() {
  return (
    <div className={homePageStyle.pageContainer}>
      <LoginCard />
    </div>
  );
}

export default HomePage;
