import Image from "next/image";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const Messenger = () => {
  const [isContent, setIsContent] = useState(false);
  return (
    <div className="flex h-fit w-full flex-row  md:px-10  ">
      <div
        className={` ${
          isContent ? "hidden w-0 md:flex" : "mr-5 w-full md:mr-0"
        } card static h-fit min-h-[calc(100vh-4rem)] rounded-xl bg-base-200 lg:w-4/12`}
      >
        <ul className="card-body">
          <li>
            {" "}
            <a
              className="flex flex-row items-center justify-center gap-6 hover:bg-base-300"
              onClick={() => setIsContent(true)}
            >
              <div className="avatar ">
                <div className="h-8  w-8 rounded-full ">
                  <Image
                    src="/profile.jpg"
                    width={"32"}
                    height="32"
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold md:text-base">Order 23</p>{" "}
                <p className=" h-10 overflow-hidden text-xs md:text-base">
                  have a new Message!
                </p>
              </div>
            </a>
          </li>
          <li>
            {" "}
            <a
              className="flex flex-row items-center justify-center gap-6 hover:bg-base-300"
              onClick={() => setIsContent(true)}
            >
              <div className="avatar ">
                <div className="h-8  w-8 rounded-full ">
                  <Image
                    src="/profile.jpg"
                    width={"32"}
                    height={"32"}
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold md:text-base">Order 23</p>{" "}
                <p className=" h-10 overflow-hidden text-xs md:text-base">
                  have a new Message!
                </p>
              </div>
            </a>
          </li>
          <li>
            {" "}
            <a
              className="flex flex-row items-center justify-center gap-6 hover:bg-base-300"
              onClick={() => setIsContent(true)}
            >
              <div className="avatar ">
                <div className="h-8  w-8 rounded-full ">
                  <Image
                    src="/profile.jpg"
                    width={"32"}
                    height="32"
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold md:text-base">Order 23</p>{" "}
                <p className=" h-10 overflow-hidden text-xs md:text-base">
                  have a new Message!
                </p>
              </div>
            </a>
          </li>
          <li>
            {" "}
            <a
              className="flex flex-row items-center justify-center gap-6 hover:bg-base-300"
              onClick={() => setIsContent(true)}
            >
              <div className="avatar ">
                <div className="h-8  w-8 rounded-full ">
                  <Image
                    src="/profile.jpg"
                    width={"32"}
                    height="32"
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-bold md:text-base">Order 23</p>{" "}
                <p className=" h-10 overflow-hidden text-xs md:text-base">
                  have a new Message!
                </p>
              </div>
            </a>
          </li>
          <li>
            <button className="btn-primary btn w-full text-primary-content">
              See all messages
            </button>
          </li>
        </ul>
      </div>
      <div
        className={`${
          isContent ? "mr-5 w-full md:mr-0" : "w-0"
        }  card static h-fit min-h-[calc(100vh-4rem)] lg:w-8/12`}
      >
        <div className="card-body">
          <button
            className=" btn-secondary btn-sm btn  w-32 gap-3 md:hidden"
            onClick={() => setIsContent(false)}
          >
            {" "}
            <BiArrowBack className="h-6 w-6" /> Back
          </button>
          <p className="h-fit max-h-16">
            potential strategic approaches that can be used for market
            penetration
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default Messenger;
