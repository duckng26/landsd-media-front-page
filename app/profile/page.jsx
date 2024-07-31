"use client";

import React, { createContext, useContext, useState } from "react";
import DisplayProfile from "../ui/profile/displayProfile/displayProfile";
import EditProfile from "../ui/profile/editProfile/editProfile";
import CreateProfile from "../ui/profile/createProfile/createProfile";

export const ProfilePageContext = createContext();

function Profile() {
    const [currPage, setCurrPage] = useState("display");
    const [targetProfile, setTargetProfile] = useState(null);

    const PROFILE_PAGES = {
        display: <DisplayProfile />,
        edit: <EditProfile profile={targetProfile} />,
        create: <CreateProfile />,
    };

    return (
        <div>
            <ProfilePageContext.Provider
                value={{
                    currPage: currPage,
                    setCurrPage: setCurrPage,
                    targetProfile: targetProfile,
                    setTargetProfile: setTargetProfile,
                }}
            >
                {PROFILE_PAGES[currPage]}
            </ProfilePageContext.Provider>
        </div>
    );
}

export default Profile;
