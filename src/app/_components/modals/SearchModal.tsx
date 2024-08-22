"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useState, useMemo } from "react";
import { Range } from "react-date-range";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import { CountrySelectValue } from "../inputs/CountrySelect";
import Calender from "../inputs/Calender";
import Counter from "../inputs/Counter";
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const SearchModal = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const router = useRouter();
  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
    return "Next";
  }, [step]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
    return "Back";
  }, [step]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    // this will push you to url
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step == STEPS.INFO) return "Search";

    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.LOCATION) return undefined;

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find a perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setLocation(value as CountrySelectValue);
        }}
      />
      <hr />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="When do you wanna go?" subtitle="Pick a date range" />
        <Calender
          value={dateRange}
          onChange={(value) => {
            setDateRange(value.selection);
          }}
        />
      </div>
    );
  }

  if(step==STEPS.INFO){
    bodyContent=(
      <div className="flex flex-col gap-8">
        <Heading
        title="Share some basics information "
        subtitle="Find your perfect place"
        />
       <Counter
       title="Guests"
       subtitle="How many guests are coming ?"
       value={guestCount}
       onChange={(value) => setGuestCount(value)}
       />
              <Counter
       title="Rooms"
       subtitle="How many rooms are required ? "
       value={roomCount}
       onChange={(value) => setRoomCount(value)}
       />
              <Counter
       title="Bathrooms"
       subtitle="How many bathrooms are required? "
       value={bathroomCount}
       onChange={(value) => setBathroomCount(value)}
       />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
    />
  );
};

export default SearchModal;
