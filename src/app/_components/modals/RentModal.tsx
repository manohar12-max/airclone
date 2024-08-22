"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "../../hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../Categories";
import CategoryInput from "../CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import Map from "../Map";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"

//we will use enum to define one of state
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading,setIsLoading]=useState(false)
const router=useRouter()
  // create control- form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      price: 1,
      category: "",
      locationValue: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    
    setStep((value) => value + 1);
  };

const onSubmit:SubmitHandler<FieldValues>=(data)=>{

  if(step!=STEPS.PRICE) {
    return onNext();
  } 
  setIsLoading(true)
 
  if(!validate(data)){
    return
  }
   data.locationValue=data.location.value
  delete data.title22
  delete data.location
 
  axios.post("/api/listings", data)
  .then(()=>{
    toast.success("Listing Created");
    router.refresh()
    reset();
    setStep(STEPS.CATEGORY)
    rentModal.onClose()
  })
  .catch(()=>{
    toast.error("Something went wrong")
  }).finally(()=>{
    setIsLoading(false);
  })
}

const validate=(data:any)=>{
  if(data.category==""){
     toast.error("Please select a category")
     return false;
  }

  if(!data.location){
     toast.error("Please select a location")
     return false;
  }

  if(!data.imageSrc){
     toast.error("Please upload an image")
      return false;
  }
  return true;

}
  const actionLabel = useMemo(() => {
    
    if (step == STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        title="Which of these best describes your place"
        subtitle="Pick a category"
      />
      <div
        className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-3
      max-h-[50vh]
      overflow-y-auto
      "
      >
        {categories.map((item) => (
          <div
            key={item.label}
            className="
             col-span-1"
          >
            {/* in setCustomValue we will set the value in form as id "category" and pass the value */}
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div
        className="flex
        flex-col
        gap-8"
      >
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        {/* <Map/> */}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div
        className="
        flex
        flex-col
        gap-8"
      >
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
        <hr />

        <hr />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div
        className="
    flex
    flex-col
    gap-8"
      >
        <Heading
          title="Add pictures of your place"
          subtitle="Show guests what your place looks like"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div
        className="flex
    flex-col
    gap-8
    "
      >
        <Heading
          title={"How would you describe your place?"}
          subtitle="Short and sweet works the best!"
        />
        <div className="hidden">
        <Input
        id="title22"
        label="Title21"
 
        errors={errors}
        disabled={isLoading}
        register={register}
       
        />
        </div>
      
          <Input
        id="title"
        label="Title"
        required
        errors={errors}
        disabled={isLoading}
        register={register}
        />
        <Input
          register={register}
          id="description"
          label="Description"
          required
          errors={errors}
          disabled={isLoading}
          />
        
      </div>
    );
  }
  
  if (step === STEPS.PRICE) {
    bodyContent=(
      <div className="flex
      flex-col
      gap-8">
        <Heading
        title="Set your price"
        subtitle="How much do you charge per night?"
        />
       <Input
       id="price"
       label="Price"
       formatPrice={true}
       register={register}
       errors={errors}
       required
       type="number"
       />
      </div>
    )
  }
  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={"Airbnb Your Home"}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default RentModal;
