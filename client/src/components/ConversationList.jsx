import MobileLayout from "../layouts/MobileLayout"
import DesktopLayout from "../layouts/DesktopLayout"
import { Link, useNavigate } from "react-router-dom";

import "./ConversationList.css";
import { useState } from "react";
import { useEffect } from "react";


export default function ConversationList() {
    const navigate = useNavigate();

    const [conversations, setConversations] = useState([]);

    const [selectedConversation, setSelectedConversation] = useState({});
    const [newTitle, setNewTitle] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);
    
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

    const renameConversation = async(e) => {
        e.preventDefault();
        
        try {
            const res = await fetch(
                "/api/conversation/rename",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: selectedConversation.id,
                        title: newTitle
                    })
                },
            );

            if (res.ok) {
                setConversations(arr => 
                    arr.map(conversation => 
                        conversation.id === selectedConversation.id ? { ...conversation, title: newTitle } : conversation
                    )
                );
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSelectedConversation({});
            setNewTitle("");
            setIsRenaming(false);
        }
    }
    
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

                                            setIsRenaming(true);
                                            setSelectedConversation(conversation);
                                        }}>
                                            <img alt="Rename"/>
                                            Rename
                                        </button>
                                        <button id="conversation-delete" onClick={(e) => {
                                            e.stopPropagation();
                                            console.log("DELETE");
                                        }}>
                                            <img alt="Delete"/>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {isRenaming && (
                                <div className="conversation-rename-modal">
                                    <form onSubmit={renameConversation}>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            placeholder={selectedConversation.title}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            required
                                        />
                                        <div className="conversation-rename-modal-controls">
                                            <button onClick={() => {
                                                setNewTitle("");
                                                setSelectedConversation({});
                                                setIsRenaming(false);
                                            }}
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                type='submit' 
                                                disabled={newTitle.trim() === ""}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            }
        ></MobileLayout>
    );
}