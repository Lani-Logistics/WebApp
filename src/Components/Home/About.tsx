import { Link } from "react-router-dom";
import { SquareMousePointer } from "lucide-react";
import Title from "./Title";

const About = () => {
  return (
    <>
      <section id="about" className="py-10 line">
        <Title main="About" sub="Us" />

        <div data-aos="fade-up" className="flex md:flex-row flex-col-reverse gap-10 my-10">
          <div className="w-full center flex-1 rounded-lg overflow-hidden">
            <img src="/about2.jpg" className="object-cover" height={50} />
          </div>
          <div className="flex flex-col md:items-start items-center gap-10 flex-1">
            <div className="flex flex-col gap-6">
              {/* <h1 className="text-main capitalize text-2xl">who we are</h1> */}
              <p className="text-sub md:text-left text-center text-sm font-dm">
                At Lani Logistics, we specialize in providing fast, reliable,
                and affordable logistics solutions. Whether you're a small
                business or a large enterprise, our technology-driven approach
                ensures your deliveries are always on time and in perfect
                condition. Our mission is to bridge distances and connect people
                through seamless logistics services.
              </p>
            </div>
            <Link
              to="/app"
              className="btn bg-primary text-white h-[50px] px-6 rounded-full"
            >
              <span>Get Started</span>
              <SquareMousePointer size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
