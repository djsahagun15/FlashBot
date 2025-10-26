import MobileLayout from "../layouts/MobileLayout"
import DesktopLayout from "../layouts/DesktopLayout"
import { Link, useNavigate } from "react-router-dom";

import "./ConversationList.css";
import { useState } from "react";
import { useEffect } from "react";


export default function ConversationList() {
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);
    
    useEffect(() => {
        (async () => {
            const getConversations = await fetch(
                `/api/conversation/get-all`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                },
            );

            if (getConversations.ok) {
                const data = await getConversations.json();

                setConversations(data);
            }
        })();
    }, []);
    
    return (
        <MobileLayout
            headerContent={
                <div className="list-header">
                    <h2>FlashBot</h2>
                    <Link to="/chat/">
                        <img alt="New Chat"/>
                    </Link>
                </div>
            }
            mainContent={
                <div className="list-main">
                    {conversations.length === 0 ? (
                        <div className="empty">
                            <h2>No conversations yet.</h2>
                            <button onClick={() => {
                                navigate("/chat/");
                            }}>
                                Start new conversation
                            </button>
                        </div>
                    ) : (
                        <div className="conversations">
                            {conversations.map((conversation, index) => (
                                <div className="conversation-item" key={index} onClick={() => {
                                        navigate(`/chat/${conversation.id}`);
                                }}>
                                    <div className="conversation-item-title">
                                        <h3>{conversation.title}</h3>
                                    </div>
                                    <div className="conversation-controls">
                                        <button id="conversation-rename" onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("EDIT");
                                        }}>
                                            <img alt="Rename"/>
                                            Rename
                                        </button>
                                        <button id="conversation-delete" onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("EDIT");
                                        }}>
                                            <img alt="Delete"/>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
        ></MobileLayout>
    );
}