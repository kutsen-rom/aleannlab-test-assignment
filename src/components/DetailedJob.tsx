import { Jobs as IProps } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDate, getAddress, mapApiKey } from "./utilities";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";

// Map ID to render custom map style from Google Static Map API
const mapId = process.env.REACT_APP_MAP_ID;

export default function DetailedJob({ jobs }: IProps) {
  /**
   *  State of the address fetched from Google Geocode API
   */
  const [address, setAddress] = useState([""]);

  // Variable to get ID from URL
  const params = useParams();

  const navigate = useNavigate();

  // Find job to show through array of jobs with job ID from current URL
  const job = jobs.find((job) => job.id === params.id);

  //   When component mounts call getAddress function once to setAddress of job object's latitude and longitude
  useEffect(() => {
    if (job) {
      getAddress(setAddress, job);
    }
  }, [job]);

  // If no job is found render ErrorPage component
  if (!job) {
    return <ErrorPage />;
  }

  // Get description paragraph string from start of job.description article to Responsopilities header
  const description = job.description.split("Responsopilities:")[0];

  // Get Responsopilities paragraph string...
  const responsopilities = job.description
    // from Responsopilities header...
    .split("Responsopilities:")[1]
    // to Compensation & Benefits header
    .split("Compensation & Benefits:")[0];

  // Get Compensation & Benefits array of sentences...
  const benefits = job.description
    // from Compensation & Benefits header till the end of the article...
    .split("Compensation & Benefits:")[1]
    // split that paragraph into sentences with Regular Expression...
    .split(/\./)
    // and remove last element from array because it's just a dot
    .slice(0, -1);

  // Scroll to the top of the page at every page load
  window.scroll(0, 0);

  return (
    // MAIN CONTAINER: JOB DETAILS PAGE
    <div className="main-container-job-details-page">

      {/* CONTAINER: JOB DETAILS PAGE */}
      <div className="main-container-job-details-page flex justify-center mt-5 flex-row 
      lg:mt-[3.25rem]">

        {/** CONTAINER: ALL JOB DETAILS **/}
        <div className="container-all-jobs-details w-[92%] 
        lg:flex lg:justify-around lg:w-[64.7%] ">

          {/* CONTAINER: JOB DETAILS & CONTACTS */}
          <div className="container-job-details-and-contacts 
          lg:w-[58.6%]">

            {/** CONTAINER: JOB DETAILS & BUTTONS **/}
            <div className="container-job-details-and-buttons 
            lg:flex items-center justify-between">

              {/* MAIN HEADER: JOB DETAILS */}
              <h1 className="main-header-job-details text-brand text-left font-bold text-[1.75rem] pb-2 tracking-[0.413333px] 
              lg:pb-1 lg:text-2xl 
              xl:text-[1.75rem]">
                Job Details
              </h1>

              {/* HORIZONTAL LINE */}
              <hr className="mb-4 
              lg:hidden" />

              {/** CONTAINER: BUTTONS **/}
              <div className="container-buttons text-text mt-1 my-6 flex 
              lg:my-0 lg:text-base 
              xl:text-lg">

                {/* BUTTON: SAVE TO MY LIST */}
                <button
                  onClick={() => console.log("Save to my list button")}
                  className="button-save-to-my-list flex items-center mr-9 tracking-[-0.5px] rounded-md py-2 
                  lg:mr-2 lg:px-3 xl:px-4
                  hover:bg-background transition duration-75
                  active:bg-white 
                  focus:outline-brand focus:outline-offset-2"
                >

                  {/* BUTTON IMAGE: STAR */}
                  <div className="button-image-star w-5 mr-3 h-5 bg-[url('../public/images/star-button.svg')] bg-no-repeat 
                  lg:bg-[url('../public/images/save-button.svg')] lg:w-6 lg:h-6"></div>
                  Save to my list
                </button>

                {/* BUTTON: SHARE */}
                <button
                  onClick={() => console.log("Share button")}
                  className="button-share flex items-center tracking-[-0.5px] rounded-md py-1
                  lg:px-3 
                  xl:px-4 
                  hover:bg-background transition duration-75
                  active:bg-white 
                  focus:outline-brand focus:outline-offset-2 "
                >

                  {/* BUTTON IMAGE: SHARE */}
                  <img
                    src="/images/share-button.svg"
                    className="button-image-share w-4 mr-3 
                    lg:mr-2 
                    lg:w-5"
                    alt="Share button"
                  />
                  Share
                </button>
              </div>
            </div>

            {/* LG: HORIZONTAL LINE */}
            <hr className="mb-6 mt-1 hidden 
            lg:block" />

            {/* LG: CONTAINER: BUTTON APPLY NOW & LG-ONLY: SALARY */}
            <div className="lg-container-button-apply-now-and-lg-only-salary mt-9 ">

              {/* LG: BUTTON: APPLY NOW */}
              <button onClick={() => console.log('Top Apply now button')} className="lg-button-apply-now hidden lg:block text-white bg-brand px-[1.95rem] py-[1.1rem] text-xs rounded-md font-light mt-4 
              hover:opacity-80 transition duration-75 
              active:opacity-90 
              focus:outline-brand focus:outline-offset-2">
                APPLY NOW
              </button>
            </div>

            {/* CONTAINER: JOB TITLE & (POSTED & SALARY) */}
            <div className="line-job-title -mt-8 
            lg:mt-10
            xl:flex items-start justify-between">

              {/* LINE: JOB TITLE */}
              <h2 className="line-job-title text-brand font-bold text-2xl leading-[1.875rem] tracking-[-0.75px] mt-8 
              lg:-mt-1 lg:text-[1.375rem] 
              xl:w-[65%] xl:text-2xl ">
                {job.title}
              </h2>

              {/* CONTAINER: POSTED & SALARY */}
              <div className="container-posted-and-salary flex xl:flex-col-reverse justify-between items-center 
              lg:mt-4 lg:mb-2 
              xl:-mt-1 ">

                {/* LINE: POSTED */}
                <p className="line-posted text-[0.8125rem] font-light text-[#0304079a] 
                lg:text-lg lg:text-[#38415d5b] lg:tracking-[0.5625px] lg:mt-2 lg:mb-1 
                xl:hidden">
                  Posted {calculateDate(job.createdAt)} years ago
                </p>

                {/* CONTAINER: SALARY */}
                <div className="container-salary xl:flex xl:flex-col-reverse xl:mr-3">

                  {/* LINE: BRUTTO */}
                  <p className="line-brutto text-text text-lg tracking-tighter text-right mt-1 
                  xl:-mt-[0.375rem] xl:text-left">
                    Brutto, per year
                  </p>

                  {/* LINE: SALARY RANGE */}
                  <h3 className="line-salary-range text-brand font-bold text-xl text-right mb-3 tracking-[-0.625px] 
                  xl:mb-0">
                    € {job.salary.replace(/-/, "—").replace(/k/gi, " 000")}
                  </h3>
                </div>
              </div>
            </div>

            {/* XL: POSTED */}
            <p className="xl-line-posted hidden xl:block text-lg font-light text-[#38415d5b] tracking-[0.5625px] mt-2 mb-1">
              Posted {calculateDate(job.createdAt)} years ago
            </p>

            {/* PARAGRAPH: DESCRIPTION */}
            <p className="paragraph-description text-paragraph text-lg leading-6 tracking-tighter">
              {description}
            </p>

            {/* LINE: RESPONSOPILITIES */}
            <h4 className="line-responsopilities text-brand font-bold mt-10 mb-1 text-xl tracking-[-0.625px] 
            lg:mt-8">
              Responsopilities
            </h4>

            {/* PARAGRAPH: RESPONSOPILITIES */}
            <p className="paragraph-responsopilities text-paragraph text-lg leading-6 tracking-tighter 
            lg:mt-2">
              {responsopilities}
            </p>

            {/* LINE: COMPENSATION & BENEFITS */}
            <h4 className="line-compensation-and-benefits text-brand font-bold mt-4 mb-7 text-xl tracking-[-0.625px] 
            lg:mt-9 lg:mb-2">
              Compensation & Benefits:
            </h4>

            {/* LINE: FIRST SENTENCE OF COMPENSATION & BENEFITS */}
            <p className="line-first-sentence-of-compensation-and-benefits text-paragraph text-lg leading-6 tracking-tighter">
              {benefits[0]}:
            </p>

            {/* LIST: COMPENSATION & BENEFITS */}
            <ul>
              {/* For every item in benefits array... */}
              {benefits.map((benefit, index) => {
                // except the first one, that is already used above as a first sentence...
                if (index !== 0) {
                  // render a list item with
                  return (
                    // CONTAINER: LIST ITEM
                    <div key={index} className="flex ">
                      {/* LIST ITEM: BULLET POINT */}
                      <li className="text-[rgba(56,_69,_100,_0.632594)] text-2xl list-[square] list-inside ml-[0.09375rem] 
                      lg:list-outside lg:leading-6"></li>
                      {/* LIST ITEM: TEXT */}
                      <span className="text-paragraph text-lg leading-6 tracking-tighter pl-0">
                        {benefit}.
                      </span>
                    </div>
                  );
                } else return null
              })}
            </ul>

            {/* CONTAINER: BUTTON */}
            <div className="container-button flex justify-center mt-6 
            lg:justify-start lg:mt-9">

              {/* BUTTON: APPLY NOW */}
              <button onClick={() => console.log('Bottom Apply now button')}  
              className="text-white bg-brand px-8 py-[1.1rem] text-xs rounded-md 
              lg:font-light 
              hover:opacity-80 transition duration-75 
              active:opacity-90 
              focus:outline-brand focus:outline-offset-2">
                APPLY NOW
              </button>
            </div>

            {/* CONTAINER: ATTACHED IMAGES & ADDITIONAL INFO */}
            <div className="container-attached-images-and-additional-info 
            lg:flex flex-col-reverse">

              {/** SECTION: ATTACHED IMAGES **/}
              <section className="section-attached-images">

                {/* HEADER: ATTACHED IMAGES */}
                <h2 className="header-attached-images text-brand font-bold text-[1.75rem] tracking-[0.413333px] mt-[8.3rem] 
                lg:mt-20">
                  Attached images
                </h2>

                {/* HORIZONTAL LINE */}
                <hr className="mt-1 mb-6 
                lg:mb-5" />

                {/* CONTAINER: IMAGES */}
                <div className="container-images w-full overflow-hidden">

                  {/* CONTAINER: IMAGES (SWIPER REACT COMPONENT) */}
                  <Swiper
                    slidesPerView={1.8}
                    breakpoints={{
                      768: {
                        slidesPerView: 3,
                        width: 628,
                      },
                      1024: {
                        slidesPerView: 3,
                        width: 380,
                      },
                      1280: {
                        slidesPerView: 4,
                        width: 658,
                      },
                      1536: {
                        slidesPerView: 3,
                        width: 628,
                      },
                      1728: {
                        slidesPerView: 3,
                        width: 628,
                      },
                    }}
                    spaceBetween={10}
                    className="lg:w-[768px] 2xl:w-[800px]"
                  >
                    
                    {/* For every image in job.pictures... */}
                    {job.pictures.map((picture, index) => {
                      // render SwiperSlide component
                      return (
                        <SwiperSlide key={index}>
                          {/* IMAGE */}
                          <img
                            className="object-cover object-bottom w-full h-[7.1875rem] rounded-lg 
                            sm:h-40 
                            md:h-28
                            lg:h-16
                            xl:h-24
                            2xl:h-[7.1875rem]"
                            src={picture}
                            alt="Job presentation"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </section>

              {/** SECTION: ADDITIONAL INFO **/}
              <section className="section-additional-info">

                {/* HEADER: ADDITIONAL INFO */}
                <h2 className="header-additional-info text-brand font-bold text-[1.75rem] tracking-[0.413333px] mt-14 
                lg:mt-[5.15rem]">
                  Additional info
                </h2>

                {/* HORIZONTAL LINE */}
                <hr className="mt-1 mb-4 w-[81%]" />

                {/* LINE: EMPLOYMENT TYPE */}
                <h3 className="line-employment-type text-text text-lg mb-2 tracking-tighter">
                  Employment type
                </h3>

                {/* CONTAINER: ALL EMPLOYMENT TYPES */}
                <div className="container-all-employment-types flex">

                  {/* For every employment type */}
                  {job.employment_type.map((type) => {
                    return (
                      // CONTAINER: SINGLE EMPLOYMENT TYPE
                      <div className="container-single-employment-type bg-[#E1E6F4] w-1/3 mr-[2%] py-3 border border-[#A7AFC5] rounded-lg">
                        {/* LINE: SINGLE EMPLOYMENT TYPE */}
                        <h4 className="line-employment-type ml-[32%] text-[#55699E] font-bold tracking-[-0.457143px]">
                          {type}
                        </h4>
                      </div>
                    );
                  })}
                </div>

                {/* LINE: BENEFITS */}
                <h3 className="line-benefits text-text text-lg mb-2 mt-5 tracking-tighter">
                  Benefits
                </h3>

                {/* CONTAINER: ALL BENEFITS */}
                <div className="container-all-benefits flex">

                  {/* For every benefit */}
                  {job.benefits.map((benefit) => {
                    return (
                      // CONTAINER: SINGLE BENEFIT
                      <div className="container-single-benefit bg-[#FFF8D9] w-1/3 text-right mr-2 py-3 border border-[#FFCF00] rounded-lg">
                        {/* LINE: SINGLE BENEFIT */}
                        <h4 className="line-single-benefit text-[#988B49] font-bold tracking-[-0.4px] text-center">
                          {benefit}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          </div>

          {/**  SECTION: CONTACTS  **/}
          <section className="section-contacts ">

            {/* HEADER: CONTACTS */}
            <h2 className="header-contacts text-brand font-bold text-[1.75rem] tracking-[0.413333px] mt-[15.5%] 
            lg:hidden">
              Contacts
            </h2>

            {/* HORIZONTAL LINE */}
            <hr className="mt-2 mb-5 
            lg:hidden" />

            {/* CONTAINER: CONTACTS & MAP*/}
            <div className="container-contacts-and-map w-[97.5%] ml-[0.4375rem] h-[25.7rem] rounded-lg overflow-hidden max-w-[50rem] mb-9 
            sm:h-[33rem] 
            md:h-[36rem] 
            lg:ml-[8rem] lg:mt-1 lg:h-[25.6rem] lg:rounded-xl lg:w-[20rem] 
            xl:min-w-[20rem] xl:w-[78%]">

              {/* CONTAINER: CONTACTS */}
              <div className="container-contacts bg-[#2A3047] text-[#E7EAF0] pl-[3.88rem] overflow-hidden z-0 
              lg:relative">

                {/* LG: CONTACTS BACKGROUND CIRCLE */}
                <div className="lg-contacts-background-circle lg:block bg-[#202336] w-72 h-64 absolute left-[-5.5rem] rounded-full -z-10 hidden"></div>

                {/* LINE: DEPARTMENT NAME */}
                <h3 className="line-department-name tracking-[0.23619px] font-semibold pt-8 leading-[1.1875rem] 
                sm:text-lg 
                md:text-xl 
                lg:text-xl lg:leading-[1.5625rem] lg:tracking-[-0.625px] lg:font-medium">
                  Department name.

                  {/* LINE BREAK */}
                  <br />

                  {/* LINE: DEPARTMENT NAME SECOND LINE */}
                  {job.name}.
                </h3>

                {/* LINE: ADDRESS */}
                <p className="line-address flex tracking-[0.5px] mt-4 text-[0.9375rem] font-thin 
                sm:text-base 
                md:text-lg 
                lg:text-lg lg:leading-[1.5rem] lg:tracking-tighter lg:mt-2">

                  {/* IMAGE: GEO MARKER */}
                  <img
                    src="/images/geo.svg"
                    className="image-geo-marker w-3 mr-2 
                    lg:w-[0.875rem]"
                    alt="geo-marker"
                  />

                  {/* ADDRESS TEXT */}
                  {/* If address has more than 1 element in array delete last element (which stands for country with real coordinates) then reverse order of elements and join them to string and separate with commas  */}
                  {address.length > 1
                    ? address.slice(0, -1).reverse().join(", ")
                    : address}
                </p>

                {/* LINES: PHONE NUMBER & EMAIL */}
                <p className="lines-phone-number-and-email text-[#FFFFFFAB] font-thin tracking-[0.5px] pt-2 pb-[10%] text-[0.9375rem] 
                sm:text-base 
                md:text-lg 
                lg:text-[#E7EAF0] lg:tracking-tighter lg:text-lg lg:leading-[1.5rem] lg:pb-5">

                  {/* LINE: PHONE NUMBER */}
                  {job.phone},
                  
                  {/* LINE BREAK */}
                  <br />

                  {/* LINE: EMAIL */}
                  {job.email}
                </p>
              </div>

              {/* CONTAINER: MAP */}
              <div className="container-map w-full h-80 overflow-hidden -mt-1">

                {/* IMAGE: MAP */}
                <img
                  className="map"
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${job.location.lat - 0.005},${job.location.long + 0.0089}&markers=icon:http://s.gravatar.com/avatar/3cf9510534e7d5dcbc2fdb25c7b6d8fb?s=38%26d=identicon%26r=PG%7C${job.location.lat},${job.location.long}&zoom=14&size=400x300&scale=2&key=${mapApiKey}&map_id=${mapId}`}
                  alt="Google Map"
            />
                {/* -0.0034  center, +0.0081*/}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* LG: CONTAINER: BUTTON, RETURN TO JOB BOARD */}
      <div className="lg-container-return-to-job-board-button hidden 
      lg:block relative mt-24 pb-52 ">

        {/* BUTTON: RETURN TO JOB BOARD */}
        <button
          onClick={() => navigate("/")}
          className="button-return-to-job-board relative text-brand bg-gray-200 rounded-lg flex px-6 py-3 font-semibold text-xs items-center
          lg:left-[5%] 
          xl:left-[10%] 
          2xl:left-[13%]  
          hover:bg-gray-300 transition duration-75 
          active:bg-gray-200
          focus:outline-brand focus:outline-offset-4"
        >

          {/* IMAGE: LEFT (CHEVRON) ARROW */}
          <img
            src="/images/left-arrow.svg"
            className="image-left-chevron-arrow w-2 h-6 mr-6"
            alt="chevron-left"
          />
          RETURN TO JOB BOARD
        </button>
      </div>
    </div>
  );
}
