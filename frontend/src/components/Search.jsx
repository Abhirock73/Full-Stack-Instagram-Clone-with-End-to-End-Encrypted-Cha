
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const Search = () => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();
    const { user: Luser } = useSelector(store => store.auth);
    const handleSearch = async () => {
        try {
            console.log('hoi');

            const res = await fetch(
                `http://localhost:4000/api/v1/user/search?query=${searchQuery}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await res.json();
            setUsers(data.users);
        } catch (error) {
            console.log(error);
        }
        finally {
            setSearchQuery("");
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center pt-10 bg-gray-50">

            {/* 🔍 Search Box */}
            <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-4 flex items-center gap-3 border">
                <SearchIcon className="text-gray-400 ml-2" size={20} />

                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users by username..."
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />

                <Button onClick={handleSearch} className="rounded-full px-6">
                    Search
                </Button>
            </div>

            {/* 👥 Results Section */}
            <div className="w-full max-w-2xl mt-6 space-y-3">

                {users.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10">
                        No users found
                    </p>
                ) : (
                    users.map((user) => (
                        console.log(user) ||

                        <div
                            key={user._id}
                            onClick={() => navigate(`/profile/${user?._id}`)}
                            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
                        >
                            {/* Left Side */}
                            <div className="flex items-center gap-3">

                                {/* Avatar */}
                                {/* <img
                  src={user.profilePicture}
                  alt={user.username.charAt(0).toUpperCase()}
                  className="w-10 h-10 rounded-full object-cover"
                /> */}
                                <Avatar className='h-32 w-32'>
                                    <AvatarImage src={user?.profilePicture} alt="profilephoto" />
                                    <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                {/* User Info */}
                                <div>
                                    <h2 className="font-semibold text-gray-800">
                                        {user.username}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {user.bio || "No bio available"}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side */}
                            {user?.followers.includes(Luser._id) ? (
                                <Button
                                   
                                    variant="secondary" className="rounded-full">
                                    Unfollow
                                </Button>
                            ) : (
                                <Button
                                    
                                    variant="secondary" className="rounded-full">
                                    Follow
                                </Button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;