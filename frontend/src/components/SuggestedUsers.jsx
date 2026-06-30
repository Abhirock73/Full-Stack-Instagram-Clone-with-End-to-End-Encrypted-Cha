import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { setAuthUser, setUserProfile } from '@/redux/authSlice';

const SuggestedUsers = () => {
    const dispatch = useDispatch();

    const { user, suggestedUsers } = useSelector(store => store.auth);

    // const [isFollowingState, setIsFollowingState] = useState(user?.following?.includes(userId));
    function isUserFollowing(userId) {
        return user?.following?.includes(userId);
    }


    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-4'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-lg">{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>

                            {isUserFollowing(user?._id) ? (
                                <>
                                    <span className="text-xs px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition">
                                        Unfollow
                                    </span>
                                </>
                            ) : (
                                    <span className="text-xs px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition">
                                        follow
                                    </span>
                            )}
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers