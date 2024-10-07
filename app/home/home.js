import React from "react";
import NavigationMenu from "@/components/model/navigationMenu";
import RightSide from "@/components/model/rightSide";
import StatusUpdate from "@/components/client/router/StatusUpdate";
import Layout from "@/components/Layout";
import Link from "next/link";
import TruncatedText from "@/components/helper/TruncatedText";
import CommentActions from "@/components/model/Comments";
import Writecomment from "@/components/model/Writecomment";
import timeSince from "@/components/helper/timeSince";
import Image from "next/image";
export default async function page() {
  const res = await fetch("https://api1243.vercel.app/questions", {
    cache: "no-store", // Ensure no caching
  });
  const posts = await res.json();
  return (
    <Layout>
      <main>
        <div className="flex container mx-auto max-w-6xl gap-2 mt-[120px] md:mt-14">
          <div className="hidden md:block">
            <NavigationMenu />
          </div>
          {/* middle */}
          <div className="px-2 ml-0 md:ml-2 md:px-0 ">
            {/* <StatusClick /> */}
            <StatusUpdate />
            {/* <PostList /> */}
            {/* <React.Suspense fallback={<Loading />}> */}
            <div className="max-w-3xl mx-auto">
              <ul>
                {posts
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col px-4 py-3.5 bg-white rounded-2xl max-w-[570px] max-md:pr-5 mt-2 min-w-0 md:min-w-[570px]"
                    >
                      <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex gap-2">
                          <Image
                            loading="lazy"
                            src={item.image || "Profile.svg"}
                            width={40}
                            height={40}
                            alt="avatar"
                            className="shrink-0 w-8 h-8 aspect-square rounded-full"
                          />
                          <div className="flex flex-col my-auto">
                            <div className="flex gap-1 px-px text-black whitespace-nowrap">
                              <Link
                                href={`/profile/${item.userid}`}
                                prefetch={false}
                              >
                                <div className="grow font-semibold text-sm hover:text-[#45B09E]">
                                  {item.username}
                                </div>
                              </Link>
                            </div>
                            <div className="flex gap-2 mt-1.5 text-xs text-black text-opacity-50">
                              <div>Ceo Of Jefred</div>
                              <div>{timeSince(item.time)}</div>
                            </div>
                          </div>
                        </div>
                        <Image
                          loading="lazy"
                          src="/svg/3dots.svg"
                          alt="3dots"
                          width={24}
                          height={24}
                          className="shrink-0 my-auto w-1 aspect-[0.24]"
                        />
                      </div>
                      <div className="mt-2 text-black max-md:max-w-full">
                        <TruncatedText text={item.questiontext} />
                      </div>
                      <CommentActions item={item} />
                      <Writecomment item={item} />
                    </div>
                  ))}
              </ul>
            </div>
            {/* </React.Suspense> */}
          </div>
          {/* right side */}
          <div className="hidden md:block">
            <RightSide />
          </div>
        </div>
      </main>
    </Layout>
  );
}
