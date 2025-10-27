import './Layout.css';

export default function Layout({ headerContent, mainContent, footerContent }) {
    return (
        <div id='container'>
            <header>{headerContent}</header>
            <main>{mainContent}</main>
            <footer>{footerContent}</footer>
        </div>
    );
}