import MobileLayout from "../layouts/MobileLayout"
import DesktopLayout from "../layouts/DesktopLayout"
import { Link } from "react-router-dom";

import "./ConversationList.css";

export default function ConversationList() {
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
            mainContent={'ConversationList'}
        ></MobileLayout>
    );
}