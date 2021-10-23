import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Icons from "../../data/Icons";
import { db, firebase } from "../../firebase";
const Post = ({ post, isDummy }) => {
  const handlelikes = async (post) => {
    const user = firebase.auth().currentUser;
    const currentlikeStatus = !post.liked_by_users.includes(user.email);
    await db
      .collection("users")
      .doc(post.email)
      .collection("posts")
      .doc(post.id)
      .update({
        liked_by_users: currentlikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(user.email)
          : firebase.firestore.FieldValue.arrayRemove(user.email),
      });
  };
  return (
    <View style={{ marginBottom: 10 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader profileImage={post.profile_picture} profileName={post.name} />
      <PostImage postImage={post.image_url} />
      <PosterFooter post={post} handlelikes={handlelikes} isDummy={isDummy} />
      {post.liked_by_users.length > 0 && (
        <PostLikes likes={post.liked_by_users.length} />
      )}
      {post.caption && <PostCaption caption={post.caption} name={post.name} />}
      {post.comments.length > 0 && <PostComments comments={post.comments} />}
    </View>
  );
};
const PostHeader = ({ profileImage, profileName }) => {
  return (
    <View style={styles.posterheader}>
      <View style={styles.posterheaderleft}>
        <Image source={{ uri: profileImage }} style={styles.profile_photo} />
        <Text style={{ color: "white" }}>{profileName}</Text>
      </View>
      <Text style={{ color: "white" }}>. . .</Text>
    </View>
  );
};
const PostImage = ({ postImage }) => {
  return (
    <View style={{ height: 450, width: "100%", marginTop: 5 }}>
      <Image
        source={{ uri: postImage }}
        style={{
          height: "100%",
          resizeMode: "cover",
        }}
      />
    </View>
  );
};

const PosterFooter = ({ post, handlelikes, isDummy }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 45,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            isDummy && handlelikes(post);
          }}
        >
          <Image
            source={{
              uri:
                isDummy &&
                post.liked_by_users.includes(firebase.auth().currentUser.email)
                  ? Icons[0].activelike
                  : Icons[0].like,
            }}
            style={{ height: 28, width: 28, marginLeft: 10 }}
          />
        </TouchableOpacity>
        <Icon icon_url={Icons[1].comment} />
        <Icon icon_url={Icons[2].share} />
      </View>
      <View style={{ alignItems: "center", marginHorizontal: 10 }}>
        <Icon icon_url={Icons[3].save} />
      </View>
    </View>
  );
};

const Icon = ({ icon_url }) => (
  <TouchableOpacity>
    <Image
      source={{ uri: icon_url }}
      style={{ height: 28, width: 28, marginLeft: 10 }}
    />
  </TouchableOpacity>
);

const PostCaption = ({ caption, name }) => {
  const [Fullcaption, showCaption] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {Fullcaption ? (
        <Text
          style={{
            color: "white",
            opacity: 0.8,
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 10,
            lineHeight: 17,
            opacity: 0.6,
          }}
        >
          #{name} {caption}
        </Text>
      ) : (
        <Text
          style={{
            color: "white",
            opacity: 0.8,
            flex: 1,
            marginVertical: 5,
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontWeight: "700", color: "white" }}> #{name}</Text>
          {"  "}
          {caption.length > 25 ? caption.slice(0, 35) + "..." : caption}
        </Text>
      )}
      {!Fullcaption && (
        <Text
          style={{ color: "gray", fontSize: 12, marginRight: 10 }}
          onPress={() => showCaption(true)}
        >
          more...
        </Text>
      )}
    </View>
  );
};

const PostComments = ({ comments }) => (
  <View>
    <Text style={styles.comments}>View all {comments.length} comments</Text>
  </View>
);

const PostLikes = ({ likes }) => (
  <Text style={styles.likes}>{likes.toString()} likes</Text>
);

const styles = StyleSheet.create({
  posterheader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginHorizontal: 10,
    alignItems: "center",
  },
  posterheaderleft: { flexDirection: "row", alignItems: "center" },
  profile_photo: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "red",
    marginRight: 5,
  },
  likes: {
    color: "gray",
    fontSize: 12,
    marginLeft: 12,
    fontWeight: "100",
  },
  comments: {
    color: "white",
    marginLeft: 12,
    fontSize: 12,
    color: "gray",
  },
});
export default Post;
