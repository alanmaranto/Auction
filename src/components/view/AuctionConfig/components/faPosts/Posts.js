import React, { useState, useEffect } from "react";
import { Card, Button, Input, Header, Dimmer } from "semantic-ui-react";
import { createFAPost, getFAPosts } from "../../../../../api/posts";
import { isAuthenticated } from "../../../../../helpers/authenticate";
import PostsWrapper from "../../../../../core/Post";
import Scrollable from "../../../../../core/Scrollable";
import NoData from "../../../../../core/500/NoData";
import Loader from "../../../../../core/Loader";
import { formatDate } from "../../../../../helpers/dates";
import { useToasts } from "react-toast-notifications";

const Posts = ({ auctionId }) => {
  const { addToast } = useToasts();
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, user } = isAuthenticated();

  const fetchPosts = async () => {
    setLoading(true);
    const response = await getFAPosts(token, auctionId);
    if (response.status === 200) {
      setPosts(response.data.body);
      setLoading(false);
    }
    setLoading(false);
  };

  const sendPost = async () => {
    if (!post)
      return addToast("No puedes enviar mensajes vacíos", {
        appearance: "error",
        autoDismiss: true,
      });

    const data = {
      post,
    };

    const response = await createFAPost(token, data, auctionId);

    if (response && response.status === 201) {
      fetchPosts();
      setPost("");
      addToast("Post realizado", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      addToast("No enviado", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendPost();
    }
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [auctionId]);

  if (loading) {
    return (
      <Dimmer active inverted>
        <Loader inverted />
      </Dimmer>
    );
  }

  return (
    <Card style={{ width: "100%" }}>
      <Header as="h3" style={{ padding: "10px 0px 0px 10px" }}>
        <Header.Content>Foro de aclaraciones</Header.Content>
      </Header>
      {posts.length > 0 ? (
        <Scrollable maxHeight="320px">
          <div style={{ minHeight: 320 }}>
            {posts &&
              posts.length > 0 &&
              posts.map((post) => {
                if (post.senderId._id === user._id) {
                  return (
                    <PostsWrapper
                      key={`post-${post._id}`}
                      name={post.senderId.name}
                      message={post.post}
                      createdAt={formatDate(post.created)}
                    />
                  );
                }
                return (
                  <PostsWrapper
                    key={`post-${post._id}`}
                    name={post.senderId.name}
                    message={post.post}
                    createdAt={formatDate(post.created)}
                    right
                  />
                );
              })}
          </div>
        </Scrollable>
      ) : (
        <NoData
          title="Nadie ha hecho posts todavía"
          headerText="h3"
          headerConfig={{ padding: "0.2 em 0" }}
          textAlign="initial"
        />
      )}
      <Input
        action={<Button icon="send" onClick={() => sendPost()} />}
        placeholder="Hola..."
        onChange={(e) => setPost(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
        value={post}
        size="mini"
      />
    </Card>
  );
};

export default Posts;
