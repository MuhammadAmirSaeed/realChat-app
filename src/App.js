import "./App.css";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

// import ChannelContainer from "./components/ChannelContainer";
// import ChannelListContainer from "./components/ChannelListContainer";

// the new way to import something to make code short and easy

import { ChannelContainer, ChannelListContainer, Auth } from "./components";

const apiKey = "vw7cce6fzs3x";
const client = StreamChat.getInstance(apiKey);

// const authToken = auth;
const authToken = false;
function App() {
  if (!authToken) return <Auth />;
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
