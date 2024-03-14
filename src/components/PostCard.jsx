import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, featuredImage, title }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-80 aspect-[4/3] bg-zinc-700/50 p-2 rounded overflow-hidden transition-all duration-200 hover:shadow-[0_0_8px_#ffffff50] hover:shadow-white">
        <div className="w-full h-[80%] overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <h2 className="text-2xl font-semibold capitalize mt-2 ml-2">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
