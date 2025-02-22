
import { offers } from "@/Constants/data";
import Title from "./Title";


const Offers = () => {
  return (
    <>
      <section id="offers" className="py-10 line">
        <Title main="What we" sub="Offer" />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-10">
          {offers.map((x, y) => (
            <div data-aos="zoom-in" key={y} className="rounded-2xl relative overflow-hidden">
              <div
                className={`h-full absolute top-0 left-0 w-full bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.9)] `}
              ></div>
                  <img src={x.image} />
                  <div className={`absolute top-4 left-4 h-14 w-14 rounded-xl center text-white ${y === 0 ? "bg-primary":"bg-primary-2"}`}>
                      <x.icon size={30}/>
                  </div>
              <div className="absolute bottom-5 left-0 p-4 py-6">
                <h2 className={`text-4xl font-bold ${y===0?"text-primary":"text-primary-2"}`}>{x.title}</h2>
                <p className="text-white">{x.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Offers;
