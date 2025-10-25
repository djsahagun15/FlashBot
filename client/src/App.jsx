import { Routes, Route } from "react-router-dom";
import ConversationList from "./components/ConversationList"
import ConversationView from "./components/ConversationView"

import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ConversationList/>}/>
      <Route path="/chat/new" element={<ConversationView/>}/>
      <Route path="/chat/:conversationId" element={<ConversationView/>}/>
      <Route path="*" element={<h1>404 - Page not found</h1>}/>
    </Routes>
  )
}

export default App
