const Title = ({main, sub}:{main: string, sub:string}) => {
  return (
    <>
      <div data-aos="fade-right" className="text-main md:text-left text-center md:text-4xl text-3xl">
              <span className="text-main font-sora font-bold tracking-wide">{main}</span> <span className="bg-primary text-white px-3 uppercase rounded-e-md font-sora font-bold font-dm">{sub}</span>
      </div>
    </>
  );
};

export default Title;
