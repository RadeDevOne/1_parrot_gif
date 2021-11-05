/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC, ChangeEventHandler, SyntheticEvent } from "react";
import { useState, useEffect, Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import { motion } from "framer-motion";

import Link from "next/link";

import useProfData from "@/hooks/useProfileMenuData";

import Spinner from "../common/Spinner";

import type { PropsI } from "@/pages/profile/[profileId]";

import countries from "../../countries_n_states/1_countries.json";
import states from "../../countries_n_states/2_states.json";

import InvalidDataAlert from "../alerts/Alert";

import Button from "../buttons/Button";

import type {
  ResData as ResponseDataType,
  BodyDataTypeI,
} from "@/pages/api/profile/[profileId]";

type profType = PropsI["profile"];

interface UserDataI extends profType {
  email: string;
}

const ProfileView: FC<PropsI> = ({
  profile,
  fulfilledOrdersCount,
  favoritesCount,
}) => {
  console.log({ profile });

  const sessionData = useProfData();

  /*  const [profileData, setProfileData] = useState<UserDataI>({
    ...profile,
    email: (sessionData ? sessionData?.email : "") || "",
  }); */

  const [sanitizedProfileData, setSanitizedProfileData] = useState<UserDataI>({
    //
    ...profile,
    // WE DEFINED THIS AS nick (BUT THIS SHOULD BE FULL NAME
    // SO WE WILL ASK FOR FULL NAME)
    nick: sessionData?.name || profile?.nick || "",
    image: sessionData?.image || profile?.image || "",
    email: sessionData?.email || profile?.email || "",
    city: profile.city || "",
    country: profile.country || "",
    postalCode: profile.postalCode || "",
    streetAddress: profile.streetAddress || "",
  });

  /* useEffect(() => {
    setSanitizedProfileData((prev) => ({
      ...prev,
      // WE DEFINED THIS AS nick (BUT THIS SHOULD BE FULL NAME
      // SO WE WILL ASK FOR FULL NAME)
      nick: prev.nick || sessionData?.name || "",
      image: prev.image || sessionData?.image || "",
    }));
  }, [sessionData, setSanitizedProfileData]); */

  // ----------------------             ----------------------
  const [bodyData, setBodyData] = useState<BodyDataTypeI>({
    country: "",
    email: "",
    name: "",
    postalCode: "",
    streetAddress: "",
    regionOrState: "",
    city: "",
  });

  const [bodyDataChanged, setBodyDataChanged] = useState<boolean>(false);

  type fieldType = keyof typeof bodyData;

  const handleBodyDataChange = (fieldName: fieldType, val: string) => {
    setBodyData((prev) => ({ ...prev, [fieldName]: val }));
    setBodyDataChanged(true);
  };

  const [reqStatus, setReqStatus] = useState<"idle" | "pending">("idle");

  const [invalidFieldNames, setInvalidFieldNames] = useState<fieldType[]>([]);

  // ----------------------------------------------------------

  if (!sessionData) {
    return null;
  }

  if (sessionData.authStatus === "loading") {
    return <Spinner />;
  }

  if (!profile) {
    return null;
  }

  if (!profile.id) {
    return null;
  }

  // console.log({ sanitizedProfileData });
  // console.log({ countries });
  // console.log({ states });
  // console.log({ sessionData });

  const {
    city,
    country,
    email,
    image,
    nick: name,
    streetAddress,
    postalCode,
    regionOrState,
    id,
  } = sanitizedProfileData;

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;

    setSanitizedProfileData((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const {
      target: { name: inputName, value: inputValue },
    } = e;

    setSanitizedProfileData((prev) => ({ ...prev, [inputName]: inputValue }));
  };

  console.log({ bodyData });

  return (
    <Fragment>
      <div tw="pt-16 mb-32">
        <div tw="w-full lg:w-4/12 px-4 mx-auto">
          <div
            css={[
              css`
                transition-property: background-color;
                transition-duration: 600ms;
              `,
              tw`relative flex flex-col min-w-0 break-words bg-gray-700 light:bg-gray-300 w-full mb-6 shadow-xl rounded-lg mt-16`,
            ]}
          >
            <div tw="px-6">
              <div tw="flex flex-wrap justify-center">
                <div
                  css={[
                    css`
                      background-image: linear-gradient(
                        103.3deg,
                        #484257 12%,
                        rgba(252, 225, 208, 1) 30%,
                        rgba(255, 173, 214, 1) 52.7%,
                        rgba(162, 186, 245, 1) 71.8%,
                        #353e53 92.8%
                      );
                    `,
                    tw`w-full h-2 px-4 flex justify-center rounded-b-2xl`,
                  ]}
                >
                  <div
                    css={[
                      css`
                        transition-property: transform;
                        transition-duration: 0.3s;

                        &:hover {
                          transform: scale(1.2);
                        }

                        & img {
                          transform: scale(1.4);
                        }
                      `,
                      tw`relative flex justify-center`,
                    ]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <img
                      alt="..."
                      // src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      src={
                        sessionData?.image ||
                        profile?.image ||
                        "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                      }
                      tw="shadow-xl rounded-full w-auto align-middle border-none absolute -m-16  max-width[110px]"
                    />
                  </div>
                </div>
                <div
                  css={[
                    css`
                      & a {
                        user-select: none;

                        & span:hover {
                          color: #bd768e;
                        }
                      }
                      & span {
                        user-select: none;
                      }
                    `,
                    tw`w-full px-4 text-center mt-20`,
                  ]}
                >
                  <div tw="flex justify-center py-4 lg:pt-4 pt-8">
                    {
                      fulfilledOrdersCount > 0 ? (
                        <Link href={`/profile/stats/${id}${"#purchases"}`}>
                          <a>
                            <div tw="mr-4 p-3 text-center">
                              <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                                {fulfilledOrdersCount}
                              </span>
                              <span tw="text-sm text-gray-400 light:text-gray-600">
                                Purchases
                              </span>
                            </div>
                          </a>
                        </Link>
                      ) : (
                        //   <Link
                        //   href={`/profile/stats/${"bitcoinether"}${"#purchases"}`}
                        // >
                        <span>
                          <div tw="mr-4 p-3 text-center">
                            <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                              0
                            </span>
                            <span tw="text-sm text-gray-400 light:text-gray-600">
                              Purchases
                            </span>
                          </div>
                        </span>
                      )
                      // </Link>
                    }
                    {favoritesCount > 0 ? (
                      <Link href={`/profile/stats/${id}${"#favorites"}`}>
                        <a>
                          <div tw="mr-4 p-3 text-center">
                            <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                              {favoritesCount}
                            </span>
                            <span tw="text-sm text-gray-400 light:text-gray-600">
                              Favorites
                            </span>
                          </div>
                        </a>
                      </Link>
                    ) : (
                      <span>
                        <div tw="mr-4 p-3 text-center">
                          <span tw="text-xl font-bold block uppercase tracking-wide text-gray-900 dark:text-gray-100">
                            0
                          </span>
                          <span tw="text-sm text-gray-400 light:text-gray-600">
                            Favorites
                          </span>
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div tw="text-center mt-12">
                <h3 tw="text-xl font-semibold leading-normal dark:text-gray-300 text-gray-900 mb-2">
                  {sessionData?.name || profile?.nick || ""}
                </h3>
                <h3 tw="text-sm leading-normal underline mt-0 mb-2 dark:text-gray-200 light:text-gray-800">
                  {sessionData?.email ||
                    (profile?.email && (
                      <i>
                        {/* <i tw="mr-2 text-lg text-gray-600"></i> */}
                        {sessionData?.email || profile?.email || ""}
                      </i>
                    ))}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* SHIPPING BILLING AND REST OF STUFF */}
        <section tw="mt-8 rounded-md w-full lg:w-6/12 px-4 mx-auto mb-12">
          <form
            id="payment-form"
            // method="POST"
            // action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
            css={[
              css`
                &#payment-form#payment-form {
                  & input {
                    background-color: inherit;
                  }
                }
              `,
            ]}
          >
            <section
              className="info-fieldz"
              css={[
                css`
                  &.info-fieldz.info-fieldz.info-fieldz.info-fieldz {
                    border: crimson solid 0px;

                    overflow-x: hidden;
                    /* background: ${theme`colors.l`}; */

                    & label > span {
                      ${tw`dark:text-gray-400 light:text-gray-600`}
                    }

                    & input {
                      /* ${tw`border dark:border-gray-200 border-gray-800`}; */

                      ${tw`dark:text-gray-50 dark:placeholder-gray-600 light:text-gray-800 font-family["FiraMono"] overflow-ellipsis`}

                      &:-webkit-autofill,
                    &:-webkit-autofill:hover {
                        ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                        ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
                      }
                    }

                    & textarea:-webkit-autofill,
                    & textarea:-webkit-autofill:hover,
                    & textarea:-webkit-autofill:focus,
                    & select:-webkit-autofill,
                    & select:-webkit-autofill:hover,
                    & select:-webkit-autofill:focus {
                      ${tw`dark:-webkit-text-fill-color[#b3bed8] -webkit-text-fill-color[#32343f]`};
                      ${tw`dark:-webkit-box-shadow[0 0 0px 1000px #2f314b inset] -webkit-box-shadow[0 0 0px 1000px #c7d5df inset]`};
                    }

                    /* & input:-webkit-autofill,
                  & input:-webkit-autofill:hover,
                  & input:-webkit-autofill:focus,
                  & textarea:-webkit-autofill,
                  & textarea:-webkit-autofill:hover,
                  & textarea:-webkit-autofill:focus,
                  & select:-webkit-autofill,
                  & select:-webkit-autofill:hover,
                  & select:-webkit-autofill:focus {
                    border: 1px solid green;
                    -webkit-text-fill-color: green;
                    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
                    transition: background-color 5000s ease-in-out 0s;
                  } */
                  }
                `,
                css`
                  transition-property: background-color;
                  transition-duration: 600ms;
                `,
                tw`rounded bg-l  bg-gray-700 light:bg-gray-300`,
              ]}
            >
              <h2 tw="dark:text-gray-600 ml-4 mt-2 uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                Shipping & Billing Information
              </h2>
              <fieldset tw="mb-3 shadow-lg text-gray-600">
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">Name</span>
                  <input
                    defaultValue={
                      sanitizedProfileData.nick || sessionData.name || ""
                    }
                    onChange={(e) => {
                      const {
                        target: { value: va },
                      } = e;

                      handleInputChange(e);
                      handleBodyDataChange("name", va);
                    }}
                    tw="background-clip[content-box] focus:outline-none px-3"
                    name="nick"
                    placeholder="Try Odinsson"
                    required
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">Email</span>
                  <input
                    defaultValue={sanitizedProfileData.email || ""}
                    onChange={(e) => {
                      const {
                        target: { value: va },
                      } = e;

                      handleInputChange(e);
                      handleBodyDataChange("email", va);
                    }}
                    tw="background-clip[content-box] focus:outline-none px-3"
                    name="email"
                    type="email"
                    placeholder="try@example.com"
                    required
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">Address</span>
                  <input
                    // value={sanitizedProfileData.streetAddress || ""}
                    onChange={(e) => {
                      const {
                        target: { value: va },
                      } = e;

                      handleInputChange(e);
                      handleBodyDataChange("streetAddress", va);
                    }}
                    tw="background-clip[content-box] focus:outline-none px-3"
                    name="streetAddress"
                    placeholder="10 Street XYZ 654"
                  />
                </label>
                <label tw="flex border-b border-gray-200 h-12 py-3 items-center">
                  <span tw="dark:text-gray-300 text-right px-2">City</span>
                  <input
                    defaultValue={sanitizedProfileData.city || ""}
                    onChange={(e) => {
                      const {
                        target: { value: va },
                      } = e;

                      handleInputChange(e);
                      handleBodyDataChange("city", va);
                    }}
                    tw="-webkit-text-fill-color[inherit] background-clip[content-box] focus:outline-none px-3"
                    name="city"
                    placeholder="San Francisco"
                  />
                </label>
                {/* <label tw="inline-flex w-2/4 border-gray-200 py-3">
                <span tw="dark:text-gray-300 text-right px-2">State</span>
                <input
                  tw="background-clip[content-box] focus:outline-none px-3"
                  name="state"
                  placeholder="CA"
                />
              </label> */}

                <label tw="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                  <span tw="dark:text-gray-300 text-right px-2 xl:px-0 ">
                    ZIP
                  </span>
                  <input
                    defaultValue={sanitizedProfileData.postalCode || undefined}
                    onChange={(e) => {
                      const {
                        target: { value: va },
                      } = e;

                      handleInputChange(e);
                      handleBodyDataChange("postalCode", va);
                    }}
                    tw="-webkit-text-fill-color[inherit] background-clip[content-box] focus:outline-none px-3"
                    name="postalCode"
                    placeholder="98603"
                  />
                </label>
                <label tw="flex border-t border-gray-200 h-12 py-3 items-center select-none relative">
                  <span tw="dark:text-gray-300 text-right px-2">Country</span>
                  <div
                    id="country"
                    tw="focus:outline-none px-3 w-full flex items-center"
                  >
                    <select
                      defaultValue={sanitizedProfileData.country || "KR"}
                      onChange={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                        handleBodyDataChange("country", va);
                      }}
                      onBlur={(e) => {
                        const {
                          target: { value: va },
                        } = e;

                        handleInputChange(e);
                        handleBodyDataChange("country", va);
                      }}
                      // defaultValue={"KR"}
                      name="country"
                      tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                    >
                      {countries.map((item, i) => {
                        return (
                          <option key={`${i}-${item.iso2}`} value={item.iso2}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </label>
                {sanitizedProfileData.country === "US" && (
                  <motion.label
                    css={[
                      css`
                        /*  */
                        /*  */
                        /* ${tw`h-12 py-3`} */
                        height: 0px;
                        overflow-y: hidden;
                        /* border: crimson solid 1px; */
                      `,
                      tw`flex border-t border-gray-200 items-center select-none relative`,
                    ]}
                    animate={{
                      height: ["0rem", "3rem"],
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <span tw="dark:text-gray-300 text-right px-2">State</span>
                    <div
                      id="state"
                      tw="focus:outline-none px-3 w-full flex items-center"
                    >
                      <select
                        defaultValue={
                          sanitizedProfileData.regionOrState || "CO"
                        }
                        onChange={(e) => {
                          const {
                            target: { value: va },
                          } = e;

                          handleInputChange(e);
                          handleBodyDataChange("regionOrState", va);
                        }}
                        onBlur={(e) => {
                          const {
                            target: { value: va },
                          } = e;

                          handleInputChange(e);
                          handleBodyDataChange("regionOrState", va);
                        }}
                        name="regionOrState"
                        // defaultValue={"CO"}
                        tw="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                      >
                        {states.map((item, i) => {
                          return (
                            <option
                              key={`${i + item.state_code}`}
                              value={item.state_code}
                            >
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </motion.label>
                )}
              </fieldset>
              <hr tw="margin-top[-12px]" />
              <div
                css={[
                  tw`my-4 h-10 relative border-pink-600`,
                  css`
                    & button {
                      position: absolute;
                      right: 6px;
                      margin-right: 16px;
                      margin-top: 6px;
                      width: 100px;
                    }
                  `,
                ]}
              >
                <Button
                  onClick={() => {
                    console.log("clicked");
                  }}
                  disabled={!bodyDataChanged || reqStatus === "pending"}
                  size="small"
                  variant="secondary"
                >
                  {"Save"}
                  {reqStatus === "pending"}
                </Button>
              </div>
            </section>
          </form>
        </section>
      </div>
      <InvalidDataAlert
        visible
        header="Wrong!"
        text="Something is wrong"
        variant="error"
      />
    </Fragment>
  );
};

export default ProfileView;
