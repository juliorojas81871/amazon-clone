import { Header, Footer } from "../components/index";
import Image from "next/image";

const checkout = () => {
  return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="lg:flex max-w-screen-2xl mx-auto">
          {/* left */}
          <div className="flex-grow m-5 shadow-sm">
            <Image
              src="/assets/advertisement2.png"
              width={1020}
              height={250}
              objectFit="contain"
            />
          </div>
          {/* right */}
          <div className="flex flex-col p-5 space-y-10  bg-white">
            <h1 className="text-3xl border-b pb-4">Your Shopping Basket</h1>
          </div>
        </main>
        <Footer className=""/>        
      </div>
  );
};

export default checkout;
