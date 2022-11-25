export default function LoadingScreen() {
    return (

        // MAIN CONTAINER: LOADING SCREEN
        <div className="main-container-loading-screen w-full h-[100vh] bg-background md:bg-white flex items-center justify-center">

            {/* CONTAINER: STRIPES */}
            <div className="container-stripes flex w-12 justify-around">

                {/* STRIPE WITH -0.2 SECONDS ANIMATION DELAY */}
                <div className="stripe-first w-2 h-8 bg-brand animate-[pulsar_0.6s_infinite_-0.2s]"></div>

                {/* STRIPE WITH -0.4 SECONDS ANIMATION DELAY */}
                <div className="stripe-second w-2 h-8 bg-brand animate-[pulsar_0.6s_infinite_-0.4s]"></div>

                {/* STRIPE WITH NO ANIMATION DELAY*/}
                <div className="stripe-third w-2 h-8 bg-brand animate-[pulsar_0.6s_infinite_]"></div>
            </div>
        </div>
    )
}