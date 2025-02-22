import { SquareMousePointer } from "lucide-react"
import { Link } from "react-router-dom"


const Hero = () => {
  return (
      <>
          <section className="flex items-center line py-10 md:flex-row flex-col gap-10 min-h-screen">
              <div data-aos="fade-up" className="flex flex-col gap-10 flex-1 w-full">
                  <div className="text-main md:w-[700px] text-center md:text-left w-full">
                      <h1 className="text-4xl md:text-6xl font-sora font-bold">Effortless Logistics, Seamless Deliveries</h1>
                      <p className="text-sub font-dm text-sm md:text-base mt-4">Experience a new era of logistics solutions tailored to your business needs. From pickup to drop-off, we've got you covered</p>
                  </div>
                  <div className="flex md:flex-row flex-col-reverse gap-4 justify-center md:justify-start mx-auto min-w-[80%] md:min-w-full">
                      <Link to="/track" className=" bg-background text-main btn h-[50px] px-6 rounded-full">
                      Track Order
                      </Link>
                      <Link to="/app" className="btn bg-primary font-sora text-white h-[50px] px-6 rounded-full">
                          <span>Get Started</span>
                          <SquareMousePointer size={18}/>
                      </Link>
                  </div>
              </div>

              <div data-aos="zoom-in" className="w-full relative center flex-1 rounded-full overflow-hidden [1024px]:hidden">
                  <img
                      src="/parcel2.jpg"
                      className="object-cover"
                      height={50}
                  />
                   <div className="flex absolute left-[45%] top-[75%] -translate-x-1/2 -translate-y-1/2 items-center">
            <img src="logo-orange.png" width={40} />
            <h3 className="text-[#222] text-3xl font-bold">Lani</h3>
          </div>
              </div>
      </section>
      </>
  )
}

export default Hero