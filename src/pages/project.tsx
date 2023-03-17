import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {AiOutlineDownload} from "react-icons/ai"

const Project = () => {
  enum ViewState {
    details = "details",
    customerFiles = "customerFiles",
    expertFiles="expertFiles",
    messages = "messages",
  }
  const [animationParent] = useAutoAnimate();
  const [view, setView] = useState<ViewState>(ViewState.details);
  return (
    <div className="mx-auto my-20 flex h-fit min-h-[40vh] w-full md:w-[95%] flex-col gap-10 rounded-lg p-8 shadow-lg shadow-accent"  ref={animationParent}>
      <div
        className="mx-auto flex h-fit w-full max-w-md flex-row items-center justify-center rounded-lg bg-base-200 p-1 text-xs"
        ref={animationParent}
      >
        {view === "details" ? (
          <button
            className="btn-sm btn w-1/4 text-xs capitalize"
            onClick={() => setView(ViewState.details)}
          >
            Details
          </button>
        ) : (
          <p
            className="flex w-1/4 cursor-pointer items-center justify-center"
            onClick={() => setView(ViewState.details)}
          >
            Details
          </p>
        )}

        {view === "customerFiles" ? (
          <button
            className="btn-sm btn w-1/4 text-xs capitalize"
            onClick={() => setView(ViewState.customerFiles)}
          >
            Order Files
          </button>
        ) : (
          <p
            className="flex w-1/4 cursor-pointer items-center justify-center"
            onClick={() => setView(ViewState.customerFiles)}
          >
            Order Files
          </p>
        )}


{view === "expertFiles" ? (
          <button
            className="btn-sm btn w-1/4 text-xs capitalize"
            onClick={() => setView(ViewState.expertFiles)}
          >
            Expert Files
          </button>
        ) : (
          <p
            className="flex w-1/4 cursor-pointer items-center justify-center"
            onClick={() => setView(ViewState.expertFiles)}
          >
            Expert Files
          </p>
        )}

        {view === "messages" ? (
          <button
            className="btn-sm btn w-1/4 text-xs capitalize"
            onClick={() => setView(ViewState.messages)}
          >
            Messages
          </button>
        ) : (
          <p
            className="flex w-1/4 cursor-pointer items-center justify-center"
            onClick={() => setView(ViewState.messages)}
          >
            Messages
          </p>
        )}
      </div>
     { view ==="details" && <div className="flex flex-col w-full max-w-4xl p-4 md:p-8 mx-auto bg-base-200 rounded-md">
      <div className="grid w-full  grid-cols-1 md:grid-cols-2 mx-auto gap-5 ">
      <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
          <p className="font-semibold">Order Number:</p>
          <p> 23</p>
        </div>
        <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
           <p className="font-semibold">Subject:</p>
          <p>Accounting </p>
        </div>
        <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
        <p className="font-semibold">Academic Level:</p>
          <p>College </p>
        </div>
        <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
        <p className="font-semibold">Format:</p>
          <p>APA </p>
        </div>
        <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
        <p className="font-semibold">Number of Pages:</p>
          <p> 9</p>
        </div>
        <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
        <p className="font-semibold">Type of Paper:</p>
          <p> Essay</p>
        </div>
        <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
        <p className="font-semibold">Deadline:</p>
          <p> March 16, 2023, 08:00 am</p>
        </div>
        
        <div className="mx-2 flex w-full flex-row gap-6">
        <p className="font-semibold">Topic:</p>
          <p> Does her current path appear to fill a void outside of holding someone | something accountable for her brothers death</p>
        </div>
       
        

      </div>
      <div className="mx-2 flex w-full flex-col gap-6">
        <p className="font-semibold">Description</p>
          <p> Respond to each classmate statement with at least 100 words: Classmate 1) Good Evening Classmates and Mrs. Vann, For this weeks discussion post I was assigned RETAIL. A retail business model that is the best for success is a B2C or direct to consumer. Where one would pick a specific consumer base and direct all sales to them. Such as Best Buy, if you want an electronic they will have you covered. You need something for the office, home or professional business, you can go to OfficeMax/Depot to find your needs. We see other businesses do this such as Petsmart, Tractor Supply, Home Depot, and Lowes to name a few you put their business model out there for the entire world to see. The video showed us Walmart has a business model of having products that middle and lower class can afford. To have lower cost they ultimately have to buy the product for less than and use less customer service employees throughout the store to cut their cost. To set up a building in a small town where others wouldnt helped them become one of the biggest retailers all over. Classmate 2) Good day classmates, For this week’s forum post, I was tasked with providing an example of how the “Consumer Apparel” industry uses either the product and/or marketing business model.</p>
        </div>
        </div>}
  {   view==="messages" &&  <div className="card-body w-full max-w-5xl mx-auto">
         
          <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble chat-bubble-accent static">
              It&apos;s over Anakin, <br />I have the high ground. I have the
              high ground.I have the high ground.I have the high ground.I have
              the high ground.I have the high ground.I have the high ground.
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble static">
              You underestimate my power!You underestimate my power!You
              underestimate my power!You underestimate my power!You
              underestimate my power!You underestimate my power!You
              underestimate my power!
            </div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </div>}
        {view==="customerFiles" &&  <div className="card-body w-full max-w-5xl mx-auto md:p-12">
            <div className="grid grid-cols-1 w-full max-w-md gap-6">
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-8 w-8 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-6 w-6 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-6 w-6 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-6 w-6 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                
                </ div >
            
            </div>}
            {view==="expertFiles" &&  <div className="card-body w-full max-w-5xl mx-auto md:p-12">
            <div className="grid grid-cols-1 w-full max-w-md gap-6">
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-8 w-8 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-6 w-6 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-6 w-6 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                <div className="flex flex-row gap-3">
                    <AiOutlineDownload className="h-6 w-6 text-sky-400 cursor-pointer"/>
                    <p> March 16, 2023, 08:00 am</p>
                    <p className="text-sky-500 cursor-pointer"> Quantitative Reasoning Assignment.pdf</p>

                </div>
                
                </ div >
            
            </div>}


    </div>
    
  );
};

export default Project;
