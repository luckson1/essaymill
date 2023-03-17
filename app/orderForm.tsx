
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useController, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "~/components/Dropezone";
import BasicDateTimePicker from "~/components/datepicker";
import { z } from 'zod';
import moment from 'moment';
import { type Subject } from '@prisma/client';
export const onboardingSchema = z.object({
  firstName: z.string().nonempty("First Name Required!").min(3, {message:"Too Short!"}),
  lastName: z.string().nonempty("Last Name Required!").min(3, {message:"Too Short!"}),
  email: z.string().email({message: "Enter a Valid Email!"}).nonempty("Email Required!"),
  topic: z.string().nonempty("Topic Required!").min(3, {message:"Too Short!"}),
  description: z.string().nonempty("Description Required!").min(50, {message:"Too Short!"}),
  subjectId: z.string().nonempty("Subject Required!"),
  country: z.string().nonempty("Country Required!").min(3, {message:"Too Short!"}),
  deadline: z.string().nonempty("Deadline Required!").min(3, {message:"Too Short!"}),
  pages: z.number().nonnegative("Pages cannot be Negative"),
  files: z
  .custom<FileList>()
  .refine((val) => val && val.length > 0, "File is required"),
  academicLevel: z.enum(["undergraduate", "graduate", "phd"], {
    errorMap: ()=> ({message:  'You must select a valid  academic level for your paper!'}),
  }),
  typeOfPaper: z.enum(["essay", "researchPaper", "dissertation"],{
    errorMap: ()=> ({message:  'You must select a valid paper type!'}),
  }),
  format: z.enum(["Chicago", "APA", "MLA", "Havard", "Other", "No", "None"],{
    errorMap: ()=> ({message:  'You must select a valid  format or your paper!'}),
  })
});

export type Values = z.infer<typeof onboardingSchema>;
const Order = ({setIsShowForm, subjects}: { setIsShowForm: Dispatch<SetStateAction<boolean>>, subjects: Subject[]}) => {

    const {
        control,
        register,
        handleSubmit,
        
       
        formState: { errors },
      } = useForm<Values>({
        resolver: zodResolver(onboardingSchema),
      });
    
// const price=useMemo(()=> {


// }, [])


const { field } = useController({ name:"files", control});


  return (
    <div className="card h-fit w-full bg-base-100  max-w-4xl my-6 shadow-lg shadow-accent mx-auto">
    <div className="card-body">
      <form
        className="grid w-full  grid-cols-1 md:grid-cols-2 justify-center md:gap-x-6 item-center mx-auto"
        // onSubmit={handleSubmit((data) => {
        //   console.log(data);
         
        // })}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Tell me your name, please?</span>
          </label>
          <div className='flex flex-row gap-3'>
            <div className='flex flex-col gap-2'>
            <input
            type="text"
            placeholder="First Name"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register("firstName")}
          />
    <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="firstName"
              as="h5"
              className="text-red-600"
            />
          </label>
            </div>
        

<div className='flex flex-col gap-2'>

<input
            type="text"
            placeholder="Last Name"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register("lastName")}
          /> 
              <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="lastName"
              as="h5"
              className="text-red-600"
            />
          </label>           
</div>
           
          
          </div>
      
      
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">What is your Email?</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register("email")}

          />
             <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="email"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
    

        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              Which Country are you from?
            </span>
          </label>
          <input
            type="text"
            placeholder="Country"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register("country")}
          />
             <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="country"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
    
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              Pick the subject of your assignment
            </span>
          </label>
          <select
            className="select-bordered select-primary select"
            {...register("subjectId")}
          >
            <option value="">Subject</option>
         {subjects && subjects.map(s=> (
             <option key={s.id} value={s.id}>{s.name}</option>
         ))}
          
          </select>
          <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="subjectId"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              Pick the academic level
            </span>
          </label>
          <select
              className="select-bordered select-primary select"
              {...register("academicLevel")}
            >
              <option value="">Academic Level</option>
              <option value="undergraduate" >Undegraduate</option>
              <option value="graduate">Graduate</option>
              <option value="phd">PhD</option>
            </select>
            <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="academicLevel"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              What is the format of the Paper?
            </span>
          </label>
          <select
            className="select-bordered select-primary select"
            {...register("format")}
          >
            <option value="">Select</option>
            <option value="Chicago">Chicago/Turabian</option>
            <option value="APA">APA</option>
            <option value="MLA">MLA</option>
            <option value="Harvard">Harvard</option>
        
            <option value="Other">Other</option>
            <option value="None">
              No references needed
            </option>
          </select>
          <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="format"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
   
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              How many pages do you need?
            </span>
          </label>
          <input
            type="number"
            className="input-bordered input-primary input w-full max-w-xs"
            {...register("pages", {
              valueAsNumber: true, 
            })}
          />
             <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="pages"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">
              What is the topic of the project?
            </span>
          </label>
          <input
            className="input-bordered input-primary input"
            placeholder="Topic of the Paper"
            id="topic"
            {...register("topic")}
          />
          <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="topic"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
   
      
          
        
<div className='form-control w-full max-w-xs'>
<label className="label">
              <span className="label-text">When is the paper due?</span>
            </label>
            <Controller
           
  control={control}
name="deadline"
  rules={{
    validate: {
      min: (date:string) => moment(date).isBefore(moment()) || "Please, enter a future date"
    }
  }}
  render={({ field: { ref, onBlur, name, onChange }, fieldState,  }) => (
   
<BasicDateTimePicker ref={ref} onBlur={onBlur} name={name} fieldState= {fieldState} onChange={onChange} />


)}
/>
<label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="deadline"
              as="h5"
              className="text-red-600"
            />
          </label>
</div>
       
     
   <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Choose the type of Paper</span>
            </label>
            <select
              className="select-bordered select-primary select"
              {...register("typeOfPaper")}
            >
              <option value="">Type of Paper</option>
              <option value="essay">Essay</option>
              <option value="researchPaper">Research Paper</option>
              <option value="dissertation">Dissertation</option>
            </select>
            <label className="label"></label>
            <ErrorMessage
              errors={errors}
              name="typeOfPaper"
              as="h5"
              className="text-red-600"
            />
          </div>
          <div className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">Project Description?</span>
          </label>
          <textarea

            className="textarea-bordered textarea-primary textarea h-28"
            placeholder="Additional information"
            id="details"
            {...register("description")}
          ></textarea>
          <label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="description"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs ">
          <label className="label">
            <span className="label-text">
       Attach any project files
            </span>
          </label>
  
          <Controller
  control={control}
  name="files"

  render={({ field: { onBlur,}}) => (
<Dropzone
           
           field={field}
           onBlur={onBlur}
              
              />)} />

<label className="label">
            {/* errors */}
            <ErrorMessage
              errors={errors}
              name="files"
              as="h5"
              className="text-red-600"
            />
          </label>
        </div>
        <div className="form-control w-full max-w-xs mt-4">
          <button className="btn-primary btn" role='submit'>Submit</button>
        </div>
        <div className="form-control w-full max-w-xs mt-4">
          <button role="button" className="btn-error btn"
          onClick={(e)=>{ setIsShowForm(false); e.preventDefault();}}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Order