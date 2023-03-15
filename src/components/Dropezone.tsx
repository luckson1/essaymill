
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type { ControllerRenderProps, Noop,} from "react-hook-form";
import { BsCloudUpload } from "react-icons/bs";
import { type Values } from "../../app/orderForm";

const Dropzone=({ field, onBlur, }: {
  onBlur: Noop,
  field: ControllerRenderProps<Values, "files">
}) => {
  const [files, setFiles] = useState<File[]>([]);
    const { getRootProps, getInputProps, isDragActive  } = useDropzone({
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles);
        field.onChange(acceptedFiles);
    
      },

    
    });

    return (
        <section className=" item-center   flex h-fit min-h-28   w-full flex-col rounded-md  border-2 border-dashed border-primary bg-base-100 py-4 px-2 ">
        <div

          {...getRootProps({ className: "dropzone" })}
          className="cursor-pointer  "
        >

<input {...getInputProps({ onBlur })} />
          <div className="flex w-full flex-row items-center justify-center gap-3 align-baseline">
            <BsCloudUpload className="text-xl" />{" "}
          
             { isDragActive? <p>Drop them here!</p>: <p>Drag & drop files here, or click to select files</p>}
       
          </div>
        </div>
        <aside className="mt-2 flex flex-col h-fit w-full  flex-wrap md:mt-6">
     { files.length>0 &&  <strong><h2>Files</h2></strong>}
   
          <ul>
   
           { files.map(file => 
           
           
           <li key={file.name}>{file.name}</li>)}</ul>
        </aside>
      </section>
    );
};


export default Dropzone