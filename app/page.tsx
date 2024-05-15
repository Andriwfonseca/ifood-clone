import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/ui/category-list";

export default function Home() {
  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="my-6 px-5">
        <Image
          src="/promo-banner-01.png"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="100vw"
          alt="Até 30% de desconto em pizzas"
          quality={100}
        />
      </div>
    </>
  );
}
