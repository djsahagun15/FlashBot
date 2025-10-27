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

    const [confirmDeletion, setConfirmDeletion] = useState(false);
    
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

    const deleteConversation = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "/api/conversation/delete",
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: selectedConversation.id })
                },
            );

            if (res.ok) {
                setConversations(arr => arr.filter(conversation => conversation.id !== selectedConversation.id));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSelectedConversation({});
            setConfirmDeletion(false);
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
                                            
                                            setSelectedConversation(conversation);
                                            setConfirmDeletion(true);
                                        }}>
                                            <img alt="Delete"/>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {isRenaming && (
                                <div className="conversation-modal">
                                    <form onSubmit={renameConversation}>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            placeholder={selectedConversation.title}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            required
                                        />
                                        <div className="conversation-modal-controls rename">
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

                            {confirmDeletion && (
                                <div className="conversation-modal">
                                    <div className="conversation-delete-modal">
                                        <p>This action will permanently delete <b>{selectedConversation.title}</b></p>
                                        <div className="conversation-modal-controls delete">
                                            <button onClick={() => {
                                                setSelectedConversation({});
                                                setConfirmDeletion(false);
                                            }}
                                            >
                                                Cancel
                                            </button>
                                            <button onClick={deleteConversation}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            }
        ></MobileLayout>
    );
}