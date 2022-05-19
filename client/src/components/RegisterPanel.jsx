import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { postConfig } from "../helpers/config";
import { validateEmail } from "../Utils/validate";

const RegisterPanel = ({ onClose }) => {
  const toast = useToast();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [userData, setUserData] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = userData;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async () => {
    // ? validate for agree to terms
    if (terms === false) {
      toast({
        title: `Please agree terms & conditions`,
        status: "error",
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
      return;
    }
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
    const { data } = await axios.post(
      "/api/user/",
      { firstName, lastName, email, password },
      postConfig
    );
    toast({
      title: `${data.email} registered successfully`,
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top-right",
    });
    // ? add user data to the local storage
    localStorage.setItem("cineplex-user", JSON.stringify(data));
    setLoading(false);
    onClose();
  };
  return (
    <VStack>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          isRequired
          name="firstName"
          value={firstName}
          onChange={(e) => handleChange(e)}
          isFullWidth
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          isRequired
          name="lastName"
          value={lastName}
          onChange={(e) => handleChange(e)}
          isFullWidth
        />
      </FormControl>
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
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          isRequired
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => handleChange(e)}
          isFullWidth
        />
      </FormControl>

      <Checkbox
        d="flex"
        justifyContent="flex-start"
        size="sm"
        width="100%"
        isRequired
        value={terms}
        onChange={() => setTerms(!terms)}
      >
        Accept Terms and Condition*
      </Checkbox>
      <Button
        colorScheme="whatsapp"
        style={{ marginTop: "30px" }}
        isFullWidth
        variant="solid"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default RegisterPanel;
