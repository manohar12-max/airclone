"use client";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import {
  FieldValues, //it has types
  SubmitHandler,
  useForm,
} from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import userLoginModal from "@/app/hooks/userLoginModal";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal=userLoginModal()
  const [isLoading, setIsLoading] = useState(false);
  
  // form control
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registration successful");
        registerModal.onClose();
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error("Something went wrong")
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const bodyContent=(
    <div className="flex flex-col gap-4">
    <Heading center title="Welcome to Airbnb" subtitle="Create an account"/>
    <Input 
    id="email"
    label="Email"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />     
      <Input 
    id="name"
    label="Name"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />      
      <Input 
    id="password"
    label="Password"
    type="password"
    disabled={isLoading}
    register={register}
    errors={errors}
    required
    />                                          
    </div>
  )

  const footerContent=(
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
      outline
     
      label="Continue with Google"
      icon={FcGoogle}
      onClick={() => {signIn("google")}}

      />
       <Button
      outline

      label="Continue with GitHub"
      icon={AiFillGithub}
      onClick={() => {signIn("github")}}
      
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div className="">Already have an account?</div>
          <div className="cursor-pointer font-semibold " onClick={()=>{registerModal.onClose();loginModal.onOpen()}}>click here</div>
        </div>
      </div>
    </div>
  )
  return(
<Modal
disabled={isLoading}
  isOpen={registerModal.isOpen}
  onClose={registerModal.onClose}
  title="Register"
  actionLabel="Continue"
  onSubmit={handleSubmit(onSubmit)}
  body={bodyContent}
  footer={footerContent}
/>

  )
  
};
export default RegisterModal;
