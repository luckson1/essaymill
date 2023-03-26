import { Controller, useController, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "~/components/Dropezone";
import BasicDateTimePicker from "~/components/datepicker";
import { z } from "zod";
import moment from "moment";
import { type Project, type Subject } from "@prisma/client";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import axios from "axios";
import { type Dispatch, type SetStateAction, useEffect, useMemo } from "react";
import LoadingButton from "../loadingState/Button";
export const onboardingSchema = z.object({
  firstName: z
    .string()
    .nonempty("First Name Required!")
    .min(3, { message: "Too Short!" }),
  lastName: z
    .string()
    .nonempty("Last Name Required!")
    .min(3, { message: "Too Short!" }),
  email: z
    .string()
    .email({ message: "Enter a Valid Email!" })
    .nonempty("Email Required!"),
  topic: z
    .string()
    .nonempty("Topic Required!")
    .min(3, { message: "Too Short!" }),
  description: z
    .string()
    .nonempty("Description Required!")
    .min(50, { message: "Too Short!" }),
  subjectId: z.string().nonempty("Subject Required!"),
  country: z
    .string()
    .nonempty("Country Required!")
    .min(3, { message: "Too Short!" }),
  deadline: z
    .string()
    .nonempty("Deadline Required!")
    .min(3, { message: "Too Short!" }),
  pages: z.number().nonnegative("Pages cannot be Negative"),
  files: z
    .custom<FileList>().optional(),
  academicLevel: z.enum(["undergraduate", "graduate", "phd"], {
    errorMap: () => ({
      message: "You must select a valid  academic level for your paper!",
    }),
  }),
  typeOfPaper: z.enum(["essay", "researchPaper", "dissertation"], {
    errorMap: () => ({ message: "You must select a valid paper type!" }),
  }),
  format: z.enum(["Chicago", "APA", "MLA", "Harvard", "Other", "None"], {
    errorMap: () => ({
      message: "You must select a valid  format or your paper!",
    }),
  }),
});
const productSchema=onboardingSchema.omit({lastName: true, firstName: true, email: true})
export type OnboardingValues = z.infer<typeof onboardingSchema>;
export type ProductValues = z.infer<typeof productSchema>;
const OrderForm = ({
  subjects,
  price,
  setPrice,
  setEmail,
  setIsShowForm,
  setProject,
  authorised
}: {
  subjects?: Subject[];
  price: number;
  setIsShowForm:  Dispatch<SetStateAction<boolean>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setProject: Dispatch<SetStateAction<Project | undefined>>;
  authorised: boolean;
}) => {
 
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<OnboardingValues>({
    resolver: authorised? zodResolver(productSchema) :zodResolver(onboardingSchema),
  });
  const values = watch();

  const { pages, academicLevel, deadline } = values;
const {files, email} =getValues()
  // determining the remaining time
  const time = useMemo(() => {
    const today = moment();
    const due = deadline ? moment(deadline) : moment().add(1, "weeks");
    const time = due.diff(today, "days");
    return time;
  }, [deadline]);

  useEffect(() => {
    // set price based on deadline, academic Level and number of pages
    const academicLevelMultiplier =
      academicLevel === "graduate" ? 1.2 : academicLevel === "phd" ? 1.5 : 1;

    const deadlineMultiplier =
      time <= 1 ? 1.5 : time <= 3 && time > 1 ? 1.2 : 1;
    const pagesMultiplier = isNaN(pages) ? 1 : pages;
   
    setPrice(
      10 * pagesMultiplier * academicLevelMultiplier * deadlineMultiplier
    );

  }, [academicLevel, time, setPrice, pages]);

  const uploadToS3 =async (project:Project)=> {
    if (!files) {
      return null;
    }
    
    // loop through files and create a file entry in db, then create s3 signed url using file id
    for (const file of files) {
      const { data }: { data: { uploadUrl: string; key: string } } =
        await axios.get(
          `/api/aws/fileUpload?projectId=${project.id}&type=${"customerFile"}&name=${file.name}&userId=${project.userId}`
        );
    
      const { uploadUrl } = data;

      await axios.put(uploadUrl, file);
    }
  }
  const { mutate: onboard, isLoading } = api.onboarding.onboarding.useMutation({
    onSuccess: async (project) => {
      setProject(project)
      setEmail(email)
      setIsShowForm(false)
   
await uploadToS3(project)
  
    
    },
  });

  const { mutate: addProject, isLoading:isProjectLoading } = api.project.addProduct.useMutation({
    onSuccess: async (project) => {
      setProject(project)
      setEmail(email)
      setIsShowForm(false)
   
await uploadToS3(project)
  
    
    },
  });

  const { field } = useController({ name: "files", control });
  const router = useRouter();

  return (
    <div className="card z-[1000] mx-auto h-fit w-full  max-w-3xl bg-base-100 shadow-lg shadow-secondary">
      <div className="card-body">
        <form
          className=" flex w-full   flex-col"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit((data) => {
           authorised?addProject(data): onboard(data);
          })}
        >
          <div className="item-center mx-3 md:max-6  grid w-full grid-cols-1 justify-center md:grid-cols-2 md:gap-x-6">
          {!authorised &&
          <>
          <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Tell me your name, please?</span>
              </label>
              <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input-bordered  input w-full max-w-xs"
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

                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input-bordered  input w-full max-w-xs"
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
                className="input-bordered  input w-full max-w-xs"
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
            </>
            }

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Which Country are you from?</span>
              </label>
              <input
                type="text"
                placeholder="Country"
                className="input-bordered  input w-full max-w-xs"
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
                className="select-bordered  select"
                {...register("subjectId")}
              >
                <option value="">Subject</option>
                {subjects &&
                  subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
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
                <span className="label-text">Pick the academic level</span>
              </label>
              <select
                className="select-bordered  select"
                {...register("academicLevel")}
              >
                <option value="">Academic Level</option>
                <option value="undergraduate">Undegraduate</option>
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
                className="select-bordered  select"
                {...register("format")}
              >
                <option value="">Select</option>
                <option value="Chicago">Chicago/Turabian</option>
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Harvard">Harvard</option>

                <option value="Other">Other</option>
                <option value="None">No references needed</option>
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
                <span className="label-text">How many pages do you need?</span>
              </label>
              <input
                type="number"
                className="input-bordered  input w-full max-w-xs"
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
                className="input-bordered  input"
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">When is the paper due?</span>
              </label>
              <Controller
                control={control}
                name="deadline"
                rules={{
                  validate: {
                    min: (date: string) =>
                      moment(date).isBefore(moment()) ||
                      "Please, enter a future date",
                  },
                }}
                render={({
                  field: { ref, onBlur, name, onChange },
                  fieldState,
                }) => (
                  <BasicDateTimePicker
                    ref={ref}
                    onBlur={onBlur}
                    name={name}
                    fieldState={fieldState}
                    onChange={onChange}
                  />
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
                className="select-bordered  select"
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
                className="textarea-bordered  textarea h-28"
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
                <span className="label-text">Attach any project files</span>
              </label>

              <Controller
                control={control}
                name="files"
                render={({ field: { onBlur } }) => (
                  <Dropzone field={field} onBlur={onBlur} />
                )}
              />

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
            <div className="my-4 flex h-12 w-full max-w-xs flex-row items-center  justify-between rounded-lg px-5 shadow shadow-secondary ">
              <p className="text-xl">Price</p>
              <p className="text-right text-xl font-bold text-green-400">
                {price}
              </p>
            </div>
          </div>

          <div className="item-center mx-auto  grid w-full grid-cols-1 justify-center md:grid-cols-2 md:gap-x-6">
            <div className="form-control mt-4 w-full max-w-xs">
            {isLoading || isProjectLoading ?  <LoadingButton /> :<button className="btn-primary btn" role="submit">
                Submit
              </button> }
            </div>
            <div className="form-control mt-4 w-full max-w-xs">
              <button
              disabled={isLoading || isProjectLoading}
                role="button"
                className="btn-error btn"
                onClick={(e) => {
                  router.back();
                  e.preventDefault();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
