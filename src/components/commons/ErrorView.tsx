export const ErrorView=()=>
    <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-row items-center gap-8">
            {/* Text Section */}
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold">Wystąpił błąd</h1>
                <h2 className="text-lg">Podczas ładowania tej strony wystąpił krytyczny błąd.</h2>
            </div>
            {/* Image Section */}
            <div>
                <img src="/error.png" alt="error" className="max-w-xs"/>
            </div>
        </div>
    </div>