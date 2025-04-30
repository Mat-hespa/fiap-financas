import { Header } from '@/components/layout/Header/index';
import { Footer } from '@/components/layout/Footer/index';
import { Hero } from '@/components/home/Hero/index';
import { Benefits } from '@/components/home/Benefits/index';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
      </main>
      <Footer />
    </>
  );
}