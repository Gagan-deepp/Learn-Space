import { cn, formatDate } from "@/lib/utils";
import { ChevronRightIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const CommunityCard = ({ com }) => {

    const { _createdAt, count, members, author, _id, description, image, title, category } = com;
    return (
        <li className="startup-card group hover:scale-[0.9] duration-200 transition-all ease-in-out" >
            <div className="flex-between group-hover:text-white-1">
                <p className="startup_card_date" >
                    {formatDate(_createdAt)}
                </p>

                <div className="flex gap-1 ">
                    <User className="text-black-2 size-6 group-hover:text-white-1" />
                    <span className="text-16-medium group-hover:text-white-1" > {count} </span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5" >
                <div className="flex-1">
                    <Link href={`/user/${author?._id}`} >
                        <p className="text-16-medium line-clamp-1 group-hover:text-white-1"> {author?.name} </p>
                    </Link>

                    <Link href={`/community/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1 group-hover:text-white-1" > {title} </h3>
                    </Link>
                </div>

                {/* User Profile */}
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image} alt="profile" width={48} height={48} className="rounded-full" />
                </Link>
            </div>

            <Link href={`/community/${_id}`}>
                <p className="startup-card_desc group-hover:text-white-1" >
                    {description}
                </p>

                <img src={image} alt="card_icon" className="startup-card_img" />
            </Link>

            <div className="flex-between gap-3 mt-3 " >
                <Link href={`/?search=${category?.toLowerCase()}`} className="startup-card_btn" >
                    <p className="text-16-medium !text-white-1" >
                        {category}
                    </p>
                </Link>

                <Button className="startup-card_btn" asChild >
                    <Link href={`/community/${_id}`} >
                        <ChevronRightIcon />
                    </Link>
                </Button>
            </div>

        </li>
    )
}

export const CommunityCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index) => (
            <li key={cn('skeletons', index)}  >
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
)
export default CommunityCard