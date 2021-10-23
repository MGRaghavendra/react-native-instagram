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
  Alert,
} from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase";
const LoginForm = ({ navigation }) => {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .min(6, "Your password has to have at least 6 characters")
      .required(),
  });

  const onLogin = async (email, password) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(user.user.email, " Logged in Successfull..✅✅");
    } catch (error) {
      Alert.alert(
        "🙉 oho No❗",
        error.message + "\n\n ...What would you like to do next 🤔❗",
        [
          {
            text: "OK",
            onPress: () => console.log("Ok"),
            style: "cancel",
          },
          { text: "Sign Up", onPress: () => navigation.push("SignUpscreen") },
        ]
      );
    }
  };

  // const onLogin = async (email, password) => {
  //   try {
  //     await firebase.auth().signInWithEmailAndPassword(email, password);
  //     console.log("🔥 login is successful ✅", email, password);
  //   } catch (error) {
  //     Alert.alert(
  //       "🙉 oho No❗",
  //       error.message + "\n\n ...What would you like to do next 🤔❗",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => console.log("Ok"),
  //           style: "cancel",
  //         },
  //         { text: "Sign Up", onPress: () => navigation.push("SignUpscreen") },
  //       ]
  //     );
  //   }
  // };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        onLogin(values.email, values.password);
      }}
      validationSchema={loginFormSchema}
      validateOnMount={true}
    >
      {({ values, handleBlur, handleChange, handleSubmit, isValid }) => (
        <View style={{ marginTop: 45, marginHorizontal: 15 }}>
          <TextInput
            placeholder="Phone number,username or mail"
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
          <View
            style={{
              marginTop: 8,
              alignItems: "flex-end",
            }}
          >
            <Text style={{ color: "#6BB0F5" }}>Forgot password?</Text>
          </View>
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
            onPress={() => handleSubmit()}
          >
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#fff" }}>
              Log In
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 13 }}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 13, color: "#6BB0F5" }}
                onPress={() => {
                  navigation.push("SignUpscreen");
                }}
              >
                {" "}
                Sign Up
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

export default LoginForm;
