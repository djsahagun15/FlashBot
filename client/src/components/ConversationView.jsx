import MobileLayout from "../layouts/MobileLayout"
import DesktopLayout from "../layouts/DesktopLayout"

import TimeBasedGreeting from "./TimeBasedGreeting"

import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import "./ConversationView.css"

export default function ConversationView() {
    const navigate = useNavigate();

    const { conversationId } = useParams();
    
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        if (!conversationId) return;

        (async () => {
            const getMessages = await fetch(
                `/api/message/get/${conversationId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                },
            );

            if (getMessages.ok) {
                const data = await getMessages.json();

                setMessages(data);
            }
        })();
    }, [conversationId]);

    const promptHandler = async(e) => {
        e.preventDefault();

        setPrompt("");

        try {
            setMessages(arr => [...arr, { sender: "user", content: prompt }]);

            const res = await fetch(
                "/api/conversation/add",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        conversationId: conversationId,
                        prompt: prompt
                    })
                },
            );

            if (res.ok) {
                const data = await res.json();

                setMessages(arr => [...arr, { sender: "AI", content: data.response }]);

                if (data.conversationId != conversationId) {
                    navigate(`/chat/${data.conversationId}`);
                    return;
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MobileLayout
            headerContent={
                <div className="view-header">
                    <Link to="/">
                        <img alt="Back"/>
                    </Link>
                    <h2>FlashBot</h2>
                </div>
            }
            mainContent={
                <div className={`view-main ${messages.length !== 0 ? "chat" : "greeting"}`}>
                    {messages.length === 0 ? (<TimeBasedGreeting/>) : (
                        <div className="messages">
                            {messages.map((message, index) => (
                                <div className={`message ${message.sender === "user" ? "user" : "ai" }`} key={index}>
                                    <p>{message.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
            footerContent={
                <div className="view-footer">
                    <div className="prompt">
                        <textarea
                            rows="1" 
                            placeholder="Ask Anything"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        ></textarea>
                        {prompt.trim() !== "" && (
                            <button onClick={promptHandler}>
                                <img alt="Send Prompt"/>
                            </button>
                        )}
                    </div>
                </div>
            }
        ></MobileLayout>
    )
}