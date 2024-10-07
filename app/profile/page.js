import React from "react";
import Cover from "@/components/profile/Cover";

import Notes from "@/components/profile/Notes";
import Profile from "@/components/auth/register/Profile";
import Tabs from "@/components/profile/NavigationMenu";
import CoverPhotoId from "@/components/profile/CoverPhoto/CoverPhotoId";

export default function page() {
  return (
    <div className="mt-20">
      {/* <Cover /> */}
      <CoverPhotoId />
      <Tabs />
      {/* <Profile /> */}
      {/* <Notes /> */}
    </div>
  );
}
