import React from "react";
import Map from "./OurLocation";

export default function ContactUs() {
  return (
    <div className=" w-full flex flex-col gap-x-8 gap-y-10  items-center 
     md:justify-center  md:flex-row  bg-[#FAFAFA] pt-5 ">
      <div className="  flex items-center md:w-2/5 w-4/5  md:h-auto     ">
        <Map />
      </div>



      {/* contact us form */}
      <div className="md:w-2/5 w-4/5     ">
        <p className='text-lg  font-PoppinsMedium mb-3  text-[#3B235D] '>Contact Us</p>
        <form >
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name" // Placeholder text
            required
            className="w-full border p-2 mb-2 rounded outline-none " // Added rounded corners
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email" // Placeholder text
            required
            className="w-full border p-2 mb-2 rounded  outline-none " // Added rounded corners
          />

          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject" // Placeholder text
            required
            className="w-full border p-2 mb-2 rounded outline-none " // Added rounded corners
          />

          <textarea
            id="message"
            name="message"
            placeholder="Tell us your problem" // Placeholder text
            required
            className="w-full border p-2 mb-2 h-32 rounded outline-none  " // Added rounded corners
          ></textarea>

          <button
            type="submit"
            className="bg-[#3B235D] hover:bg-[#462b6b] tracking-wide text-white
             font-PoppinsRegular py-2 px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}