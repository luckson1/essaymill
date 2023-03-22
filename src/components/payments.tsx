import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import type  { Project } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";


export default function Payments({price, project, email, authorised}:{price:number, project?:Project, email?: string, authorised: boolean}) {
const {mutate:createPayment}=api.payment.addPayment.useMutation()
const router=useRouter()
if(!project) return (<div className="text-red-500">An Error Occured</div>)
    return (
        <div className="w-full max-w-2xl flex flex-col py-8">
           <p className="text-xl text-center py-3">Pay with Paypal to place the Order</p> 
        <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "vertical" }}
            
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: price.toString(),
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
              
                return actions?.order!.capture().then(  (details) => {
                    const payingEmail = details.payer.email_address ?? "email uknown"
                     createPayment({userId:project.userId, projectId: project.id, payingEmail, amount:price})
                  
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                   authorised? router.push("/progress") : signIn("email", {email: email, callbackUrl: "/dashboard"})
                   
                });
            }}
        
            />
        </PayPalScriptProvider>
        </div>
    );
}