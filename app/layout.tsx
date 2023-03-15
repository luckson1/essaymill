

import '../src/styles/globals.css'

export const metadata = {
  title: 'Essaysdoctor',
  description: "Quality custom essays",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
  
    <html data-theme="winter" lang='en'>


    <body>
    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#2e026d] to-[#15162c] mx-auto'>
    <div className="flex w-full md:w-[90%] lg:w-[80%] flex-col justify-center items-center ">
{/* <NavBar /> */}
      
      {children}
      </div></div>
      
      </body>
   
    </html>
  )
}
