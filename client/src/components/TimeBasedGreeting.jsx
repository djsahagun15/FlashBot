export default function TimeBasedGreeting() {
    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return "Good Morning";
        else if (hour >= 12 && hour < 5) return "Good Afternoon";
        else return "Good Evening";
    }

    return (
        <>
            <h1>{getGreeting()}</h1>
        </>
    )
}