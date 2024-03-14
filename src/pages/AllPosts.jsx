import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appWriteService from "../appwrite/config";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appWriteService.getPosts([]).then((_posts) => {
      if (_posts) {
        setPosts(_posts.documents);
      }
    });
  }, []);
  return posts.length > 0 ? (
    <div className="w-full py-8">
      <Container>
        <div className="flex gap-3 flex-wrap">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  ) : null;
};

export default AllPosts;
