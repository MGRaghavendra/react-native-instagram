import { Formik } from "formik";
import React from "react";
import * as Validator from "email-validator";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { firebase, db } from "../../firebase";
import * as Yup from "yup";
import { Alert } from "react-native";
import Posts from "../../data/Posts";

const SignUpform = ({ navigation }) => {
  const signUpFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string(),
    password: Yup.string()
      .min(6, "Your password has to have at least 6 characters")
      .required(),
  });

  const getRandomProfilepicture = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (email, password, username) => {
    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await firebase
        .auth()
        .currentUser.updateProfile({ displayName: username });
      console.log(user.user.email, " is created account Successful..");
      await db
        .collection("users")
        .doc(user.user.email)
        .set({
          dummy_posts: Posts,
          owner_id: user.user.uid,
          profile_picture_url: await getRandomProfilepicture(),
          email: user.user.email,
          username,
        });
    } catch (e) {
      Alert.alert("Sorry", e.message, [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
        },
      ]);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      onSubmit={async (values) => {
        await onSignUp(values.email, values.password, values.username);
      }}
      validationSchema={signUpFormSchema}
      validateOnMount={true}
    >
      {({ values, handleBlur, handleChange, handleSubmit, isValid }) => (
        <View style={{ marginTop: 45, marginHorizontal: 15 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#444"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={[
              styles.inputfield,
              {
                borderColor:
                  values.email.length < 1 || Validator.validate(values.email)
                    ? "#ccc"
                    : "red",
              },
            ]}
            autoFocus={true}
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#444"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            style={[
              styles.inputfield,
              {
                borderColor:
                  values.username.length > 2 || values.username.length < 1
                    ? "#ccc"
                    : "red",
              },
            ]}
            value={values.username}
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor="#444"
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="password"
            secureTextEntry={true}
            style={[
              styles.inputfield,
              {
                borderColor:
                  1 > values.password.length || values.password.length >= 6
                    ? "#ccc"
                    : "red",
              },
            ]}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
          />

          <Pressable
            style={{
              width: "100%",
              backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
              alignItems: "center",
              minHeight: 42,
              justifyContent: "center",
              borderRadius: 5,
              marginTop: 30,
            }}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
              Sign Up
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 13 }}>Already have an account?</Text>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 13, color: "#6BB0F5" }}
                onPress={() => navigation.goBack()}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputfield: {
    borderWidth: 1,
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    letterSpacing: 0.2,
    backgroundColor: "#FAFAFA",
  },
});

export default SignUpform;
