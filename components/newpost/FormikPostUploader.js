import { Formik } from "formik";
import React from "react";
import { firebase, db } from "../../firebase";
import { View, Text, TextInput, Image, Button } from "react-native";
import { Divider } from "react-native-elements";
import * as Yup from "yup";
import validUrl from "valid-url";

const PLACEHOLDER_IMG =
  "https://picnicday.ucdavis.edu/wp-content/uploads/woocommerce-placeholder.png";

const uploadPostSchema = Yup.object().shape({
  image_url: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "caption has reached the characters limit"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailurl, setThumbnailurl] = React.useState(PLACEHOLDER_IMG);
  const handleShare = async ({ image_url, caption }) => {
    const auth_user = firebase.auth().currentUser;
    const { email, displayName, uid } = auth_user;
    const userdata = await db
      .collection("users")
      .doc(email)
      .get()
      .then((doc) => doc.data());
    await db.collection("users").doc(email).collection("posts").add({
      name: displayName,
      email,
      image_url,
      profile_picture: userdata.profile_picture_url,
      liked_by_users: [],
      caption,
      comments: [],
      owner_id: uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
  return (
    <Formik
      initialValues={{ image_url: "", caption: "" }}
      validationSchema={uploadPostSchema}
      onSubmit={(values) => {
        handleShare(values);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        values,
        errors,
      }) => {
        return (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 10,
              }}
            >
              <Image
                source={{
                  uri: validUrl.isUri(thumbnailurl)
                    ? thumbnailurl
                    : PLACEHOLDER_IMG,
                }}
                style={{ height: 100, width: 100, resizeMode: "contain" }}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <TextInput
                  placeholder="write a caption..."
                  placeholderTextColor="gray"
                  multiline={true}
                  style={{ color: "white", fontSize: 20 }}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
              </View>
            </View>
            <Divider width={0.2} orientation="vertical" />
            <TextInput
              onChange={(e) => setThumbnailurl(e.nativeEvent.text)}
              placeholder="image url"
              placeholderTextColor="gray"
              style={{ color: "white", fontSize: 18, marginVertical: 10 }}
              multiline={true}
              onChangeText={handleChange("image_url")}
              onBlur={handleBlur("caption")}
              value={values.image_url}
            />
            {errors.image_url && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.image_url}
              </Text>
            )}
            <Button
              onPress={() => {
                handleSubmit();
                navigation.goBack();
              }}
              title="share"
              disabled={!isValid}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default FormikPostUploader;
