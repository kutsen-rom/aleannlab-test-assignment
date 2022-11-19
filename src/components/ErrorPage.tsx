import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

  // React Router variable to use browser history
  const navigate = useNavigate();

  return (

    // MAIN CONTAINER: ERROR PAGE & ERROR LINE
    <div className="main-container-error-page-and-error-line h-[100vh] bg-background md:bg-white flex flex-col items-center justify-center text-brand text-xl md:text-2xl font-extrabold ">
      Oops. Something gone wrong...

      {/* CONTAINER: BUTTONS */}
      <div className="container-buttons w-72 md:w-[36rem] md:mt-3 flex justify-around ">

        {/* BUTTON: GO BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mt-5 text-base text-background border border-brand bg-brand px-4 py-2 rounded-md font-medium hover:bg-background md:hover:bg-white hover:text-brand transition focus:outline-2 focus:outline-[#3A4562] outline-offset-4 active:bg-gray-400"
        >
          Go Back
        </button>

        {/* BUTTON: TO MAIN PAGE */}
        <button
          onClick={() => navigate('/')}
          className="mt-5 text-base text-background bg-brand border border-brand px-4 py-2 rounded-md font-medium hover:bg-background md:hover:bg-white hover:text-brand transition focus:outline-2 focus:outline-[#3A4562] outline-offset-4 active:bg-gray-400"
        >
          To main page
        </button>
      </div>
    </div>
  );
}
