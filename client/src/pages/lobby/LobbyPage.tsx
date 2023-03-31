import LoginCard from "../../components/LoginCard/LoginCard";

const lobbyPageStyle = {
  pageContainer:
    "w-[100vw] h-[100vh] bg-homeBackground flex items-center justify-center ",
};

function LobbyPage() {
  return (
    <div className={lobbyPageStyle.pageContainer}>
      <LoginCard />
    </div>
  );
}

export default LobbyPage;
