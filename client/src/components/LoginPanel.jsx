import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UserState } from "../Context/Store";
import axios from "axios";
import { postConfig } from "../helpers/config";
import { validateEmail } from "../Utils/validate";

const LoginPanel = ({ onClose }) => {
  const toast = useToast();
  const { setUser } = UserState();
  const [loading, setLoading] = useState(false);

  // ? Form initial state
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    // ? handle errors
    if (!email || !password) {
      return toast({
        title: `Please enter all the required fields`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
    // ? validate email
    if (!validateEmail(email)) {
      return toast({
        title: `Invalid email format`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
    // ? create new user req
    const { data } = await axios.post("/api/user/login", userData, postConfig);
    toast({
      title: `${data.email} logged in successfully`,
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top-right",
    });
    // ? add user data to the local storage
    localStorage.setItem("cineplex-user", JSON.stringify(data));
    setUser(data);
    setLoading(false);
    onClose();
  };
  return (
    <VStack>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          isRequired
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
          isFullWidth
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          isRequired
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
          isFullWidth
        />
      </FormControl>
      <Button
        colorScheme="whatsapp"
        style={{ marginTop: "30px" }}
        isFullWidth
        variant="solid"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default LoginPanel;
