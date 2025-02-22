import { services } from "@/Constants/data"
import Title from "./Title"

const Services = () => {
  return (
      <>
          <section id="services" className="py-10 line">
              <Title main="Our" sub="Services" />
              
              <div className="my-10">
                  <ul className="grid md:grid-cols-2 grid-cols-1 gap-4">
                      {services.map((x, y) => (
                          <li data-aos="zoom-in" key={y} className="flex flex-col gap-4 bg-background p-4 rounded-xl">
                              <div className="h-10 w-10 center bg-primary text-white rounded-lg">
                                  <x.icon/>
                              </div>
                              <div className="">
                                  <h3 className="text-xl text-main font-sora font-semibold">{x.title}</h3>
                                  <p className="text-sm font-dm text-sub font-light">{x.content}</p>
                              </div>
                          </li>
                      ))}
                  </ul>
              </div>
         </section>
      </>
  )
}

export default Services