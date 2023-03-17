
import '../src/styles/globals.css'
import Nav from './Nav'

export const metadata = {
  title: 'Essaysdoctor',
  description: "Quality custom essays",
}


export default  function RootLayout({
  children,
  
}: {
  children: React.ReactNode

}) {


  return (
  
    <html data-theme="winter" lang='en'>


    <body>
    <div className='flex flex-col justify-center items-start w-screen'>
    <div className="flex w-full flex-col justify-center items-center ">
<Nav />
      
      {children}
      </div></div>
      
      </body>
   
    </html>
  )
}
