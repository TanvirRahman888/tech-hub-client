import CustomerReview from "@/component/CustomerReview/CustomerReview";
import PopularProducts from "@/component/PopularProducts/PopularProducts";
import ProductCategory from "@/component/ProductCategory/ProductCategory";
import Slider from "@/component/Slider/Slider";

export default function Home() {
  return (
    <div className="p-1">
      <Slider></Slider>
      <ProductCategory></ProductCategory>
      <PopularProducts></PopularProducts>
      <CustomerReview></CustomerReview>
    </div>
    
  );
  
}
