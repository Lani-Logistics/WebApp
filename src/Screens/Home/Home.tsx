import { Header, Hero, About, Services, Offers, Banner, FAQ, Contacts, Footer } from "@/Components/Home";
import { HomeLayout } from "@/Layouts";


const Home = () => {
  return (
    <>
    <Header/>
    <HomeLayout>
        <Hero/>
        <About/>
        <Services/>
        <Offers/>
        <Banner/>
        <FAQ/>
        <Contacts/>
        <Footer/>
    </HomeLayout>
    </>
  )
}

export default Home