import { Jobs as IProps } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { calculateDate, getAddress, mapApiKey } from "./utilities";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useEffect } from "react";
import ErrorPage from "./ErrorPage";


// Map ID to render custom map style from Google Static Map API
const mapId = process.env.REACT_APP_MAP_ID;

export default function DetailedJob ({ jobs }: IProps) {

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
  }, []);

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

    return (
        // MAIN CONTAINER: JOB DETAILS PAGE
        <div className=" flex justify-center mt-5 flex-row-reverse lg:mt-14">
    
          {/* CONTAINER: CONTACTS & MAP */}
          <div className="hidden lg:block ml-[8.5rem] h-[15.4%] overflow-hidden w-[21.1%] rounded-xl">
            
            {/* CONTAINER: CONTACTS */}
            <div className="bg-[#2A3047] text-[#E7EAF0] pl-[16.8%] lg:pl-[15.6%] relative overflow-hidden z-0">
    
              {/* CONTACTS BACKGROUND CIRCLE */}
              <div className="bg-[#202336] w-72 h-64 absolute left-[-5.5rem] rounded-full -z-10 hidden lg:block"></div>
    
              {/* LINE: DEPARTMENT NAME FIRST LINE */}
              <h3 className="tracking-[0.23619px] font-semibold pt-8 leading-[19px] lg:text-xl lg:leading-[25px] lg:tracking-[-0.625px] lg:font-medium">
                Department name.
    
                {/* LINE BREAK */}
                <br />
    
                {/* LINE: DEPARTMENT NAME SECOND LINE */}
                {job.name}.
              </h3>
    
              {/* LINE: ADDRESS */}
              <p className="flex tracking-[0.5px] mt-4 text-[15px] font-thin lg:text-lg lg:leading-[24px] lg:tracking-tighter lg:mt-2">
    
                {/* IMAGE: GEO MARKER */}
                <img src="/images/geo.svg" className="w-3 mr-2 lg:w-[0.875rem]" />
    
                {/* ADDRESS TEXT */}
                {/* If address has more than 1 element in array delete last element (which stands for country with real coordinates) then reverse order of elements and join them to string and separate with commas  */}
                {address.length > 1 ? address.slice(0, -1).reverse().join(", ") : address}
            </p>
    
              {/** PARAGRAPH: PHONE NUMBER & EMAIL **/}
              {/* LINE: PHONE NUMBER */}
              <p className="text-[rgba(255,_255,_255,_0.669635)] font-thin tracking-[0.5px] pt-2 pb-[10%] text-[15px] lg:text-[#E7EAF0] lg:tracking-tighter lg:text-lg lg:leading-[24px]">
                {job.phone},
    
                {/* LINE BREAK */}
                <br />
    
                {/* LINE: EMAIL */}
                {job.email}
              </p>
            </div>
    
            {/* CONTAINER: MAP */}
            <div className="w-full h-80 overflow-hidden lg:h-[14.5rem]">
    
              {/* MAP */}
              <img
                className=""
                src={`https://maps.googleapis.com/maps/api/staticmap?center=48.2172,16.3551&markers=icon:http://s.gravatar.com/avatar/3cf9510534e7d5dcbc2fdb25c7b6d8fb?s=38%26d=identicon%26r=PG%7C48.2206,16.3468&zoom=14&size=400x300&scale=2&key=${mapApiKey}&map_id=${mapId}`}
              />
            </div>
          </div>
    
          {/** CONTAINER: ALL JOB DETAILS **/}
          <div className=" w-[92%] lg:w-[38%] lg:ml-6">
    
            {/** CONTAINER: JOB DETAILS & BUTTONS **/}
            <div className="lg:flex items-center justify-between">
    
              {/* MAIN HEADER: JOB DETAILS */}
              <h1 className="text-brand text-left font-bold text-[28px] pb-2 tracking-[0.413333px] lg:pb-1">
                Job Details
              </h1>
    
              {/* HORIZONTAL LINE */}
              <hr className="mt-1 mb-6 lg:hidden" />
    
              {/** CONTAINER: BUTTONS **/}
              <div className="my-6 flex lg:my-0 text-text lg:text-lg">
    
                {/* BUTTON: SAVE TO MY LIST */}
                <button
                  onClick={() => console.log("Save to my list button")}
                  className="flex items-center mr-2 tracking-[-0.5px] rounded-md px-4 py-2 transition duration-75 hover:bg-background active:bg-white focus:outline-brand focus:outline-offset-2"
                >
    
                  {/* BUTTON IMAGE: STAR */}
                  <div className="w-5 mr-3 h-5 bg-[url('../public/images/star-button.svg')] bg-no-repeat lg:bg-[url('../public/images/save-button.svg')] lg:w-6 lg:h-6"></div>
                  Save to my list
                </button>
    
                {/* BUTTON: SHARE */}
                <button
                  onClick={() => console.log("Share button")}
                  className="flex items-center tracking-[-0.5px] rounded-md px-4 py-1 transition duration-75 hover:bg-background active:bg-white focus:outline-brand focus:outline-offset-2"
                >
    
                  {/* BUTTON IMAGE: SHARE */}
                  <img src="/images/share-button.svg" className="w-4 mr-2 lg:w-5" />
                  Share
                </button>
              </div>
            </div>
    
            {/* HORIZONTAL LINE */}
            <hr className="mb-6 hidden lg:block" />
    
            {/* BUTTON: APPLY NOW */}
            <button className="hidden lg:block text-white bg-brand px-8 py-4 text-xs rounded-md font-light mt-9 hover:opacity-80 transition duration-75 active:opacity-90 focus:outline-brand focus:outline-offset-2">
              APPLY NOW
            </button>
    
            {/* JOB TITLE */}
            <div className="lg:flex items-start justify-between lg:mt-9">
              <h2 className="text-brand font-bold text-2xl leading-[30px] tracking-[-0.75px] mt-8 lg:mt-0 lg:w-[65%] ">
                {job.title}
              </h2>
    
              {/* CONTAINER: POSTED & SALARY */}
              <div className="flex justify-between items-center">
    
                {/* POSTED */}
                <p className="text-xs font-light text-[#0304079a] lg:hidden">
                  Posted {calculateDate(job.createdAt)} years ago
                </p>
    
                {/* CONTAINER: SALARY*/}
                <div className="lg:flex lg:flex-col-reverse">
    
                  {/* LINE: BRUTTO */}
                  <p className="text-text text-lg tracking-tighter text-right mt-1 lg:mt-0 lg:text-left">
                    Brutto, per year
                  </p>
    
                  {/* LINE: SALARY RANGE */}
                  <h3 className="text-brand font-bold text-xl text-right mb-3 tracking-[-0.625px] lg:mb-0">
                    € {job.salary.replace(/-/, "—").replace(/k/gi, " 000")}
                  </h3>
                </div>
              </div>
            </div>
    
            {/* POSTED */}
            <p className="hidden lg:block text-lg font-light text-[rgba(56,_65,_93,_0.355988)] tracking-[0.5625px] mt-2 mb-1">
              Posted {calculateDate(job.createdAt)} years ago
            </p>
    
            {/* PARAGRAPH: DESCRIPTION */}
            <p className="text-paragraph text-lg leading-6 tracking-tighter">
              {description}
            </p>
    
            {/* LINE: RESPONSOPILITIES */}
            <h4 className="text-brand font-bold mt-10 mb-1 text-xl tracking-[-0.625px] lg:mt-9">
              Responsopilities
            </h4>
    
            {/* PARAGRAPH: RESPONSOPILITIES */}
            <p className="text-paragraph text-lg leading-6 tracking-tighter">
              {responsopilities}
            </p>
    
            {/* LINE: COMPENSATION & BENEFITS */}
            <h4 className="text-brand font-bold mt-4 mb-7 text-xl tracking-[-0.625px] lg:mt-9 lg:mb-2">
              Compensation & Benefits:
            </h4>
    
            {/* LINE: FIRST SENTENCE OF COMPENSATION & BENEFITS */}
            <p className="text-paragraph text-lg leading-6 tracking-tighter">
              {benefits[0]}:
            </p>
    
            {/* LIST: COMPENSATION & BENEFITS */}
            <ul>
              {/* For every item in benefits array... */}
              {benefits.map((benefit, index) => {
                // except the first one, that is already used...
                if (index !== 0) {
                  // render a list item
                  return (
                    // CONTAINER: LIST ITEM
                    <div key={index} className="flex ">
                      {/* LIST ITEM: BULLET POINT */}
                      <li className="text-[rgba(56,_69,_100,_0.632594)] text-2xl list-[square] list-inside ml-[1.5px] lg:list-outside lg:leading-6"></li>
                      {/* LIST ITEM: TEXT */}
                      <span className="text-paragraph text-lg leading-6 tracking-tighter pl-0">
                        {benefit}.
                      </span>
                    </div>
                  );
                }
              })}
            </ul>
    
            {/* CONTAINER: BUTTON */}
            <div className="flex justify-center mt-6 lg:justify-start lg:mt-8">
    
              {/* BUTTON: APPLY NOW */}
              <button className="text-white bg-brand px-8 py-4 text-xs rounded-md lg:font-light hover:opacity-80 transition duration-75 active:opacity-90 focus:outline-brand focus:outline-offset-2">
                APPLY NOW
              </button>
            </div>
    
            {/* CONTAINER: ATTACHED IMAGES & ADDITIONAL INFO */}
            <div className="lg:flex flex-col-reverse">
    
    
              {/** SECTION: ATTACHED IMAGES **/}
              <div>
    
                {/* HEADER: ATTACHED IMAGES */}
                <h2 className="text-brand font-bold text-[28px] tracking-[0.413333px] mt-[34.5%] lg:mt-20">
                  Attached images
                </h2>
    
                {/* HORIZONTAL LINE */}
                <hr className="mt-1 mb-6 lg:mb-5" />
    
                {/* CONTAINER: IMAGES */}
                <div className="w-full overflow-hidden">
    
                  {/* CONTAINER: IMAGES (SWIPER REACT COMPONENT) */}
                  <Swiper
                    slidesPerView={1.8}
                    breakpoints={{
                      768: {
                        slidesPerView: 3,
                        width: 628,
                      },
                      1366: {
                        slidesPerView: 3,
                        width: 550,
                      },
                      1568: {
                        slidesPerView: 3,
                        width: 628,
                      },
                      1728: {
                        slidesPerView: 3,
                        width: 628,
                      },
                    }}
                    spaceBetween={10}
                    className="lg:w-[768px]"
                  >
    
                    {/* For every image in job.pictures... */}
                    {job.pictures.map((picture, index) => {
                      // render SwiperSlide component
                      return (
                        <SwiperSlide key={index}>
                          {/* IMAGE */}
                          <img
                            className="object-cover object-bottom w-full h-[115px] rounded-lg"
                            src={picture}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
    
              {/** SECTION: ADDITIONAL INFO **/}
              <div>
    
                {/* HEADER: ADDITIONAL INFO */}
                <h2 className="text-brand font-bold text-[28px] tracking-[0.413333px] mt-[15.5%]">
                  Additional info
                </h2>
    
                {/* HORIZONTAL LINE */}
                <hr className="mt-1 mb-4 w-[81%]" />
    
                {/* LINE: EMPLOYMENT TYPE */}
                <h3 className="text-text text-lg mb-2 tracking-tighter">
                  Employment type
                </h3>
    
                {/* CONTAINER: ALL EMPLOYMENT TYPES */}
                <div className="flex">
    
                  {/* For every employment type */}
                  {job.employment_type.map((type) => {
                    return (
                      // CONTAINER: SINGLE EMPLOYMENT TYPE
                      <div className="bg-[#E1E6F4] w-1/3 mr-[2%] py-3 border border-[#A7AFC5] rounded-lg">
                        {/* LINE: SINGLE EMPLOYMENT TYPE */}
                        <h4 className="ml-[32%] text-[#55699E] font-bold tracking-[-0.457143px]">
                          {type}
                        </h4>
                      </div>
                    );
                  })}
                </div>
    
                {/* LINE: BENEFITS */}
                <h3 className="text-text text-lg mb-2 mt-5 tracking-tighter">
                  Benefits
                </h3>
    
                {/* CONTAINER: ALL BENEFITS */}
                <div className="flex">
    
                  {/* For every benefit */}
                  {job.benefits.map((benefit) => {
                    return (
                      // CONTAINER: SINGLE BENEFIT
                      <div className="bg-[#FFF8D9] w-1/3 text-right mr-2 py-3 border border-[#FFCF00] rounded-lg">
                        {/* LINE: SINGLE BENEFIT */}
                        <h4 className="text-[#988B49] font-bold tracking-[-0.4px] text-center">
                          {benefit}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
    
            {/**  SECTION: CONTACTS  **/}
            <div className="lg:hidden">
    
              {/* HEADER: CONTACTS */}
              <h2 className="text-brand font-bold text-[28px] tracking-[0.413333px] mt-[15.5%]">
                Contacts
              </h2>
    
              {/* HORIZONTAL LINE */}
              <hr className="mt-1 mb-6" />
    
              {/* CONTAINER: CONTACTS & MAP*/}
              <div className="w-[97.5%] ml-[7px] h-[15.4%] rounded-lg overflow-hidden">
    
                {/* CONTAINER: CONTACTS */}
                <div className="bg-[#2A3047] text-[#E7EAF0] pl-[16.8%]">
    
                  {/* LINE: DEPARTMENT NAME FIRST LINE */}
                  <h3 className="tracking-[0.23619px] font-semibold pt-8 leading-[19px]">
                    Department name.
    
                    {/* LINE BREAK */}
                    <br />
    
                    {/* LINE: DEPARTMENT NAME SECOND LINE */}
                    {job.name}.
                  </h3>
    
                  {/* LINE: ADDRESS */}
                  <p className="flex tracking-[0.5px] mt-4 text-[15px] font-thin">
    
                    {/* IMAGE: GEO MARKER */}
                    <img src="/images/geo.svg" className="w-3 mr-2 " />
    
                    {/* ADDRESS TEXT */}
                    {/* If address has more than 1 element in array delete last element (which stands for country with real coordinates) then reverse order of elements and join them to string and separate with commas  */}
                    {address.length > 1 ? address.slice(0, -1).reverse().join(", ") : address}
                </p>
    
                  {/* LINE: PHONE NUMBER */}
                  <p className="text-[rgba(255,_255,_255,_0.669635)] font-thin tracking-[0.5px] pt-2 pb-[10%] text-[15px]">
                    {job.phone},
                    
                    {/* LINE BREAK */}
                    <br />
    
                    {/* LINE: EMAIL */}
                    {job.email}
                  </p>
                </div>
    
                {/* CONTAINER: MAP */}
                <div className="w-full h-80 overflow-hidden">
    
                  {/* MAP */}
                  <img
                    className=""
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=48.2172,16.3551&markers=icon:http://s.gravatar.com/avatar/3cf9510534e7d5dcbc2fdb25c7b6d8fb?s=38%26d=identicon%26r=PG%7C48.2206,16.3468&zoom=14&size=400x300&scale=2&key=${mapApiKey}&map_id=${mapId}`}
                  />
                </div>
              </div>
            </div>
    
            {/* CONTAINER: BUTTON, RETURN TO JOB BOARD */}
            <div className="relative mt-24 pb-52 hidden lg:block">
    
              {/* BUTTON: RETURN TO JOB BOARD */}
              <button onClick={() => navigate('/')} className="absolute -left-[5.5rem] text-brand bg-[#384564]/[0.14] rounded-lg flex px-6 py-3 font-semibold text-xs items-center">
    
                {/* IMAGE: LEFT (CHEVRON) ARROW */}
                <img src="/images/left-arrow.svg" className="w-2 h-6 mr-6" />
                RETURN TO JOB BOARD
              </button>
            </div>
          </div>
        </div>
      );
};
