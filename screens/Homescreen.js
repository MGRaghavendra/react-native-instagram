import React, { useEffect, useState } from "react";
import Header from "../components/home/Header";
import {
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import Bottomtab from "../components/home/Bottomtab";
import { firebase, db } from "../firebase";

const Homescreen = ({ navigation }) => {
  const [dummy_posts, setDummy_Posts] = useState([]);
  const [uploaded_post, setUpload_post] = useState([]);
  const login_user = firebase.auth().currentUser;
  const addDummyPosts = () => {
    db.collection("users")
      .doc(login_user.email)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setDummy_Posts(doc.data().dummy_posts);
        } else {
          setDummy_Posts([]);
        }
      });
  };

  const addUploadedposts = () => {
    try {
      db.collectionGroup("posts").onSnapshot((snapshot) => {
        setUpload_post(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
    } catch (e) {
      console.warn(e.message);
    }
  };
  useEffect(() => {
    addDummyPosts();
    addUploadedposts();
    return () => {
      setDummy_Posts([]);
      setUpload_post([]);
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView horizontal={false}>
        {uploaded_post.map((item, index) => {
          return <Post key={index} post={item} isDummy={true} />;
        })}
        {dummy_posts.map((item, index) => (
          <Post key={index} post={item} isDummy={false} />
        ))}
      </ScrollView>
      <Bottomtab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Homescreen;
