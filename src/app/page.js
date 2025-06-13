import PopularProducts from "@/component/PopularProducts/PopularProducts";
import ProductCategory from "@/component/ProductCategory/ProductCategory";
import Slider from "@/component/Slider/Slider";

export default function Home() {
  return (
    <div className="">
      <Slider></Slider>
      <ProductCategory></ProductCategory>
      <PopularProducts></PopularProducts>
    </div>
    
  );
  
}
