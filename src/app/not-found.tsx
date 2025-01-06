function NotFoundPage() {
    return <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-row items-center gap-8">
            {/* Text Section */}
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Ups! Coś poszło nie tak :(</h1>
                <h2 className="text-lg">No cóż - mleko się rozlało. Nie jesteśmy w stanie załadować tej strony.</h2>
            </div>
            {/* Image Section */}
            <div>
                <img src="/error.png" alt="error" className="max-w-xs"/>
            </div>
        </div>
    </div>
}

export default NotFoundPage;