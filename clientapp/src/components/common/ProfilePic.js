import React from 'react'
import './common.css';

const ProfilePic = ({
    fName,
    lName,
    profilePicUrl
}) => {

    return (
        <div>
            {
                profilePicUrl ? <img src={profilePicUrl} className="profile-pic-image" />
                    : <div className="profile-pic-user-name">
                        {`${fName[0]}${lName[0]}`}
                    </div>
            }
        </div>
    )
}

export default ProfilePic;