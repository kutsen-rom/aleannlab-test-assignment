export default function LoadingScreen() {
    return (

        // MAIN CONTAINER: LOADING SCREEN
        <div className="w-full h-[100vh] bg-background md:bg-white flex items-center justify-center">

            {/* CONTAINER: STRIPES */}
            <div className="flex w-12 justify-around">

                {/* STRIPE WITH -0.2 SECONDS ANIMATION DELAY */}
                <div className="w-2 h-8 bg-brand animate-[pulse_0.6s_infinite_-0.2s]"></div>

                {/* STRIPE WITH -0.4 SECONDS ANIMATION DELAY */}
                <div className="w-2 h-8 bg-brand animate-[pulse_0.6s_infinite_-0.4s]"></div>

                {/* STRIPE WITH NO ANIMATION DELAY*/}
                <div className="w-2 h-8 bg-brand animate-[pulse_0.6s_infinite_]"></div>
            </div>
        </div>
    )
}