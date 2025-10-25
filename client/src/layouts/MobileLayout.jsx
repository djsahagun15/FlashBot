import './MobileLayout.css';

export default function MobileLayout({ headerContent, mainContent, footerContent }) {
    return (
        <div id='mobile-div'>
            <header>{headerContent}</header>
            <main>{mainContent}</main>
            <footer>{footerContent}</footer>
        </div>
    );
}