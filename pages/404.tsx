import Image from "next/image";

export default function Custom404() {
  return (
    <Image src={"/images/404.jpeg"} alt={"page not found"} layout={"fill"} />
  );
}
