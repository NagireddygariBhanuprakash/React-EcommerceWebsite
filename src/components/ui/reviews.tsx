import {Review} from "@/types"
import Rating from "./rating"
import { Progress } from "./progress";
type reviewsByGroup={
    [key:PropertyKey]:Review[]
}
export default function Reviews({reviews}:{reviews : Review[]}) {
    // console.log("reviews",reviews);
    const reviewsByGroup:reviewsByGroup=(Object as any).groupBy(reviews,(review:Review)=>review.rating);
    // console.log("reviewsByGroup",reviewsByGroup);
    
    return (
        Object.entries(reviewsByGroup).reverse().map(([rating,reviewList])=>{
        return (
        <section className="grid grid-cols-2 gap-2" key={rating}>
               <p className="flex items-center gap-1">
               <Rating rating={Number(rating)}/>
               </p> 
                {/* <p>{rating}</p> */}
                <p className="flex items-center gap-3">
                    <Progress value={(reviewList.length/reviews.length)*100}max={100}/>
                    <span className="text-xs text-green-400">{((reviewList.length/reviews.length)*100).toFixed(2)}%</span>
                </p>
        </section>
                );
        }
    )  )
}
