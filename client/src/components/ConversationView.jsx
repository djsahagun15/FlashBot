import MobileLayout from "../layouts/MobileLayout"
import DesktopLayout from "../layouts/DesktopLayout"

import TimeBasedGreeting from "./TimeBasedGreeting"
import { Link, useParams } from "react-router-dom"

import "./ConversationView.css"

export default function ConversationView() {
    const { conversationId } = useParams();

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
                <div className={`view-main ${conversationId ? "chat" : "greeting"}`}>
                    {conversationId ? (
                        <div className="messages">asd</div>
                    ) : (
                        <TimeBasedGreeting/>
                    )}
                </div>
            }
            footerContent={
                <div className="view-footer">
                    <div className="prompt">
                        <textarea id="text-input" rows="1" placeholder="Ask Anything"></textarea>
                        <button>
                            <img alt="Send Prompt"/>
                        </button>
                    </div>
                </div>
            }
        ></MobileLayout>
    )
}