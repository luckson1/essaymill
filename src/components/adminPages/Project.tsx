/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiOutlineDownload } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";
import moment from "moment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BsSendCheck } from "react-icons/bs";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project as ProjectAdmin } from "@prisma/client";
import LoadingButton from "~/components/loadingState/Button";
import MessagesAdmin from "./MessagesAdmin";
import Skeleton from "../loadingState/Skeleton";
const fileSchema = z.object({ file: z.custom<FileList>(), type:z.enum(["customerFile", "DraftFIle","FinalFile"]) });
type Values=z.infer<typeof fileSchema>
const ProjectAdmin = () => {
  enum ViewState {
    details = "details",
    customerFiles = "customerFiles",
    expertFiles = "expertFiles",
    messages = "messages",
  }
  const [animationParent] = useAutoAnimate();
  const [view, setView] = useState<ViewState>(ViewState.details);
  const params = useSearchParams();
  const id = params?.get("id") as string;
  const { data: project, isLoading } = api.project.getOneProject.useQuery({
    id,
  });
  const projectId = project?.id ?? "";
  const { data: files } = api.file.getUserFiles.useQuery({ projectId });

  const ctx = api.useContext();
  
  const session = useSession();
  const userId = session.data?.user.id;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const role = session.data?.user.role;

  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm<Values>(
    { defaultValues: {type: "customerFile"},
      resolver: zodResolver(fileSchema),
    }
  );


    // mark order as complete 
    const {mutate:changeStatus}=api.project.updateProjectStatus.useMutation()

  const uploadToS3 = async (project: ProjectAdmin, filesList: FileList, type:Values["type"]) => {
    if (!filesList) {
      return null;
    }

    // loop through files and create a file entry in db, then create s3 signed url using file id

    for (const file of filesList) {
      const { data }: { data: { uploadUrl: string; key: string } } =
        await axios.get(
          `/api/aws/fileUpload?projectId=${
            project.id
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          }&type=${type}&name=${file.name}&userId=${project.userId}`
        );
      reset();
      setIsUploading(false);
      const { uploadUrl } = data;

      await axios.put(uploadUrl, file);
      
      await ctx.file.getUserFiles.invalidate();
      if(type==="FinalFile")  changeStatus({id:project.id, status:"complete"})
      return 
     
    }
  };
  if(isLoading)return( <div className='w-full h-[80vh]'><Skeleton/></div>)
  if (!project)
    return (
      <div className="mx-auto my-20 flex h-fit min-h-[40vh] w-full flex-col gap-10 rounded-lg p-8 shadow-lg shadow-accent md:w-[95%]">
        No such Project Exists
      </div>
    );
  return (
    <div
      className="mx-auto my-20 flex h-fit min-h-[40vh] w-full flex-col gap-10 rounded-lg p-8 shadow-lg shadow-accent md:w-[95%]"
      ref={animationParent}
    >
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
      {view === "details" && (
        <div className="mx-auto flex w-full max-w-4xl flex-col rounded-md bg-base-200 p-4 md:p-8">
          <div className="mx-auto grid  w-full grid-cols-1 gap-5 md:grid-cols-2 ">
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Order Number:</p>
              <p>{project.orderNumber}</p>
            </div>
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Subject:</p>
              <p>{project.subject.name}</p>
            </div>
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Academic Level:</p>
              <p>{project.academicLevel} </p>
            </div>
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Format:</p>
              <p>{project.format} </p>
            </div>
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Number of Pages:</p>
              <p> {project.pages}</p>
            </div>
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Type of Paper:</p>
              <p> {project.typeOfPaper}</p>
            </div>
            <div className="mx-2 flex w-full max-w-xs flex-row gap-6">
              <p className="font-semibold">Deadline:</p>
              <p> {moment(project.deadline).toString()}</p>
            </div>

            <div className="mx-2 flex w-full flex-row gap-6">
              <p className="font-semibold">Topic:</p>
              <p> {project.topic}</p>
            </div>
          </div>
          <div className="mx-2 flex w-full flex-col gap-6">
            <p className="font-semibold">Description</p>
            <p>{project.description}</p>
          </div>
        </div>
      )}
      {view === "messages" && (
       <MessagesAdmin projectId={projectId} userId={userId ?? ""}/>
      )}
      {view === "customerFiles" && (
        <div className="card-body mx-auto w-full max-w-5xl md:p-12">
          <div className="grid w-full max-w-md flex-1 grid-cols-1 gap-6">
            {files &&
              files
                .filter((file) => file.type === "customerFile")
                .map((f) => (
                  <div className="flex flex-row gap-3" key={f.id}>
                    <Link href={f.url}>
                      {" "}
                      <AiOutlineDownload className="h-8 w-8 cursor-pointer text-sky-400" />
                    </Link>
                    <p>{f.createdAt.toDateString()}</p>
                    <Link href={f.url}>
                      {" "}
                      <p className="cursor-pointer text-sky-500"> {f.name}</p>
                    </Link>
                  </div>
                ))}
            {role === "customer" && (
              <form
                className="flex w-full flex-row items-center justify-center gap-5"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(async (data) => {
                  setIsUploading(true);
                  await uploadToS3(project, data.file, "customerFile");
                })}
              >
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick and upload file</span>
                  </label>
                  <input
                    type="file"
                    className="file-input-bordered file-input w-full max-w-xs"
                    {...register("file")}
                  />
                  <label className="label"></label>
                </div>
                <div className="form-control w-fit">
                  {isUploading ? (
                    <LoadingButton />
                  ) : (
                    <button className="btn" role={"submit"}>
                      {" "}
                      <BsSendCheck className="h-8 w-8 text-green-400" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {view === "expertFiles" && (
        <div className="card-body mx-auto w-full max-w-5xl md:p-12">
          <div className="grid w-full max-w-md grid-cols-1 gap-6">
            {files &&
              files
                .filter(
                  (file) =>
                    file.type === "DraftFIle" || file.type === "FinalFile"
                )
                .map((f) => (
                  <div className="flex flex-row gap-3" key={f.id}>
                    <Link href={f.url}>
                      {" "}
                      <AiOutlineDownload className="h-8 w-8 cursor-pointer text-sky-400" />
                    </Link>
                    <p>{f.createdAt.toDateString()}</p>
                    <p>{f.type==="DraftFIle" ? "Type of File:" +" " + "Draft": "Type of File:" +" " + "Final Project"}</p>
                    <Link href={f.url}>
                      {" "}
                      <p className="cursor-pointer text-sky-500"> {f.name} </p>
                    </Link>
                  </div>
                ))}
          </div>
          {role === "admin" && (
              <form
                className="flex w-full flex-col items-center justify-center gap-5"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(async (data) => {
                  setIsUploading(true);
                  await uploadToS3(project, data.file, data.type);
                })}
              >
                <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Pick the type of File</span>
    
  </label>
  <select className="select select-bordered" {...register("type")}>
    <option value= "" >Pick one</option>
    <option value="DraftFIle">Draft</option>
    <option value={"FinalFile"}>Final Paper</option>
   
  </select>

</div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Pick and upload file</span>
                  </label>
                  <input
                    type="file"
                    className="file-input-bordered file-input w-full max-w-xs"
                    {...register("file")}
                  />
                  <label className="label"></label>
                </div>
                <div className="form-control w-full max-w-xs">
                  {isUploading ? (
                    <LoadingButton />
                  ) : (
                    <button className="btn w-full max-w-xs" role={"submit"}>
                      {" "}
                      <BsSendCheck className="h-8 w-8 text-green-400" />
                    </button>
                  )}
                </div>
              </form>
            )}
        </div>
      )}
    </div>
  );
};

export default ProjectAdmin;
