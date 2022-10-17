import Confetti from 'react-confetti'
import Image from 'next/image'
import { useRouter } from "next/router";

function SuccessCard() {
  const router = useRouter();
  return (
    <div className="">
      <Confetti height={765} width={700} className="mx-auto my-4" />
      <div className=" flex flex-col rounded-md border bg-white px-10 pb-10 shadow-lg ">
        <Image
          src="/assets/success.png"
          alt="Success"
          width={300}
          height={400}
          className="items-center"
          quality={100}
        />
        <h1 className="m-auto mb-5 text-6xl font-semibold text-black">
          Success !!!
        </h1>
        <p className="text-center text-xl font-semibold">
          Your Order has been placed successfully!!
        </p>
        <p className="text-center text-xl font-semibold">
          It will be delivered soon.
        </p>
          <button className="button mt-8" onClick={() => router.push("/orders")}>
            Continue Shopping
          </button>
      </div>
    </div>
  )
}

export default SuccessCard