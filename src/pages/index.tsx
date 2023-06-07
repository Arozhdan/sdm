import {
  ArrowUpRightIcon,
  BuildingLibraryIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getHome } from "~/api/Home";
import {
  Button,
  DefaultHeader,
  FAQ,
  FeedbackForm,
  ServiceCard,
  ServicePricingCard,
  Testimonials,
  TestimonialsMap,
  Typography,
} from "~/components";
import {
  type FAQ as IFAQ,
  type Homepage,
  type Testimonial,
  type Promo,
} from "~/models/api";
import { type Team } from "~/models/api/Team";
import { toast } from "react-toastify";
import { type Service } from "~/models/api/Service";
import { getContacts } from "~/api/Settings";
import { type Settings } from "~/models/api/Settings";
import Meta from "~/components/Meta";
import { getDictionary, setSlot } from "~/lang";
import { type ValueType } from "~/types";
import { submitForm } from "~/api/Form";

const Home: NextPage<IHomeProps> = ({
  page: { attributes: page },
  services,
  faq,
  team,
  testmonials,
  promos,
  settings,
  dictionary,
}) => {
  const handleSubmit = async (
    name: string,
    phone: string,
    email: string,
    link: string,
    message: string
  ) => {
    await submitForm(
      {
        name,
        phone,
        email,
        link,
        message,
      },
      dictionary
    );
  };
  return (
    <>
      <Meta seo={page.seo} />

      <DefaultHeader
        title={page.title}
        button={page.headerLink}
        video={page.video?.data?.attributes}
      />
      <section className="container mt-10 grid py-10 md:grid-cols-2 lg:mt-40 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard
            title={service.attributes.title}
            image={service.attributes.image}
            key={service.id}
            slug={`/services/${service.attributes.slug}`}
            label={dictionary.general.more}
            darkTitle={service.attributes.textColor === "dark"}
            {...service}
          />
        ))}
        <ServiceCard
          slug="#form"
          label={dictionary.general.leave_request}
          title={dictionary.home.free_showdown}
          promo
        />
      </section>
      <section className="container pb-24 pt-10">
        <Typography as="h2" variant="big" className="uppercase text-white">
          {dictionary.home.pricing}
        </Typography>
        <div className="pt-10">
          {promos?.map((promo, index) => (
            <ServicePricingCard
              title={promo.attributes.title}
              discount={promo.attributes.discount}
              index={index}
              key={promo.id}
              className="mb-3"
              href={"#form"}
              pricePrefix={dictionary.general.discount}
            />
          ))}
          <div className="flex justify-end pt-10">
            <Button
              tag="a"
              href="#form"
              icon={<ArrowUpRightIcon />}
              className="w-full md:w-fit"
            >
              {dictionary.home.free_showdown}
            </Button>
          </div>
        </div>
      </section>
      <section className="relative pb-36 pt-24">
        <div className="container">
          <Typography as="h2" variant="big" className="uppercase text-white">
            {page.gainTitle.split(" ").map((word, index) => (
              <span key={index} className="block">
                {word}
              </span>
            ))}
          </Typography>
          <div className="flex justify-end pt-2">
            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-4 md:mt-0 md:w-2/3 md:gap-x-0 lg:gap-y-10">
              {page.gains.map((gain, index) => (
                <Typography
                  as="h4"
                  variant="body1"
                  className="tracking-wider text-white"
                  key={gain.id}
                >
                  {index !== page.gains.length - 1 && (
                    <ArrowUpRightIcon className="mr-4 inline w-5 text-accent" />
                  )}
                  <span
                    className={
                      index === page.gains.length - 1 ? "bg-primary px-2" : ""
                    }
                  >
                    {gain.text}
                  </span>
                </Typography>
              ))}
            </div>
          </div>
          <div
            className="absolute
		right-0 top-1/2 h-64 w-64 -translate-y-1/2 translate-x-3/4
		transform rounded-full bg-gradient-to-br from-accent/30 
		to-accent shadow-2xl shadow-accent blur-3xl filter"
          />
        </div>
        <span className="absolute right-0 top-20 text-7xl font-bold uppercase tracking-wider text-secondary/25">
          Media
        </span>
        <span className="absolute left-0 top-1/3 mt-10 max-w-3xl pb-10 pl-10 pt-24 text-7xl font-bold uppercase tracking-wider text-secondary/10">
          DIGITAL-MARKETING
        </span>
      </section>

      <section className="container lg:py-24">
        <Typography as="h2" variant="big" className="uppercase text-white">
          <span className="border-b-2 pb-1">
            {dictionary.home.testimonials}
          </span>
        </Typography>
        <TestimonialsMap testimonials={testmonials} />
        <Testimonials testimonials={testmonials} className="lg:-mt-32" />
      </section>

      <section className="container grid py-10 md:grid-cols-3">
        <Typography
          as="h2"
          variant="big"
          className="col-span-1 uppercase text-white"
        >
          <span className="border-b-2 pb-1">Q&A</span>
        </Typography>
        <div className="col-span-2">
          <FAQ faqs={faq} />
        </div>
      </section>
      <div id="form" className="pt-14">
        <FeedbackForm dictionary={dictionary} onSubmit={handleSubmit} />
      </div>
      <section className="container pb-20 pt-40">
        <Typography
          as="h2"
          variant="big"
          className="col-span-1 uppercase text-white"
        >
          {dictionary.home.customer_service}
        </Typography>
        <div className="mt-28 items-center justify-between border-b border-white pb-20 md:flex">
          <div>
            <Typography
              as="h3"
              variant="body2"
              weight="bold"
              className="text-accent"
            >
              {dictionary.general.mail_us}:
            </Typography>
            <Typography as="div" variant="body1" className="mt-1 text-white">
              <a
                href={"mailto:" + settings?.attributes.contacts.email}
                target="_blank"
              >
                {settings?.attributes.contacts.email}
              </a>
            </Typography>
          </div>
          <div className="mt-12 flex gap-10 text-white text-white md:mt-0">
            <a target="_blank" href={settings.attributes.contacts.instagram}>
              <svg
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
                fill="currentColor"
              >
                <path d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z" />
              </svg>
            </a>
            <a target="_blank" href={settings.attributes.contacts.telegram}>
              <svg
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
                fill="currentColor"
              >
                <path d="M 44.376953 5.9863281 C 43.889905 6.0076957 43.415817 6.1432497 42.988281 6.3144531 C 42.565113 6.4845113 40.128883 7.5243408 36.53125 9.0625 C 32.933617 10.600659 28.256963 12.603668 23.621094 14.589844 C 14.349356 18.562196 5.2382813 22.470703 5.2382812 22.470703 L 5.3046875 22.445312 C 5.3046875 22.445312 4.7547875 22.629122 4.1972656 23.017578 C 3.9185047 23.211806 3.6186028 23.462555 3.3730469 23.828125 C 3.127491 24.193695 2.9479735 24.711788 3.015625 25.259766 C 3.2532479 27.184511 5.2480469 27.730469 5.2480469 27.730469 L 5.2558594 27.734375 L 14.158203 30.78125 C 14.385177 31.538434 16.858319 39.792923 17.402344 41.541016 C 17.702797 42.507484 17.984013 43.064995 18.277344 43.445312 C 18.424133 43.635633 18.577962 43.782915 18.748047 43.890625 C 18.815627 43.933415 18.8867 43.965525 18.957031 43.994141 C 18.958531 43.994806 18.959437 43.99348 18.960938 43.994141 C 18.969579 43.997952 18.977708 43.998295 18.986328 44.001953 L 18.962891 43.996094 C 18.979231 44.002694 18.995359 44.013801 19.011719 44.019531 C 19.043456 44.030655 19.062905 44.030268 19.103516 44.039062 C 20.123059 44.395042 20.966797 43.734375 20.966797 43.734375 L 21.001953 43.707031 L 26.470703 38.634766 L 35.345703 45.554688 L 35.457031 45.605469 C 37.010484 46.295216 38.415349 45.910403 39.193359 45.277344 C 39.97137 44.644284 40.277344 43.828125 40.277344 43.828125 L 40.310547 43.742188 L 46.832031 9.7519531 C 46.998903 8.9915162 47.022612 8.334202 46.865234 7.7402344 C 46.707857 7.1462668 46.325492 6.6299361 45.845703 6.34375 C 45.365914 6.0575639 44.864001 5.9649605 44.376953 5.9863281 z M 44.429688 8.0195312 C 44.627491 8.0103707 44.774102 8.032983 44.820312 8.0605469 C 44.866523 8.0881109 44.887272 8.0844829 44.931641 8.2519531 C 44.976011 8.419423 45.000036 8.7721605 44.878906 9.3242188 L 44.875 9.3359375 L 38.390625 43.128906 C 38.375275 43.162926 38.240151 43.475531 37.931641 43.726562 C 37.616914 43.982653 37.266874 44.182554 36.337891 43.792969 L 26.632812 36.224609 L 26.359375 36.009766 L 26.353516 36.015625 L 23.451172 33.837891 L 39.761719 14.648438 A 1.0001 1.0001 0 0 0 38.974609 13 A 1.0001 1.0001 0 0 0 38.445312 13.167969 L 14.84375 28.902344 L 5.9277344 25.849609 C 5.9277344 25.849609 5.0423771 25.356927 5 25.013672 C 4.99765 24.994652 4.9871961 25.011869 5.0332031 24.943359 C 5.0792101 24.874869 5.1948546 24.759225 5.3398438 24.658203 C 5.6298218 24.456159 5.9609375 24.333984 5.9609375 24.333984 L 5.9941406 24.322266 L 6.0273438 24.308594 C 6.0273438 24.308594 15.138894 20.399882 24.410156 16.427734 C 29.045787 14.44166 33.721617 12.440122 37.318359 10.902344 C 40.914175 9.3649615 43.512419 8.2583658 43.732422 8.1699219 C 43.982886 8.0696253 44.231884 8.0286918 44.429688 8.0195312 z M 33.613281 18.792969 L 21.244141 33.345703 L 21.238281 33.351562 A 1.0001 1.0001 0 0 0 21.183594 33.423828 A 1.0001 1.0001 0 0 0 21.128906 33.507812 A 1.0001 1.0001 0 0 0 20.998047 33.892578 A 1.0001 1.0001 0 0 0 20.998047 33.900391 L 19.386719 41.146484 C 19.35993 41.068197 19.341173 41.039555 19.3125 40.947266 L 19.3125 40.945312 C 18.800713 39.30085 16.467362 31.5161 16.144531 30.439453 L 33.613281 18.792969 z M 22.640625 35.730469 L 24.863281 37.398438 L 21.597656 40.425781 L 22.640625 35.730469 z" />
              </svg>
            </a>
            <a target="_blank" href={settings.attributes.contacts.whatsapp}>
              <svg
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
                fill="currentColor"
              >
                <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 29.079097 3.1186875 32.88588 4.984375 36.208984 L 2.0371094 46.730469 A 1.0001 1.0001 0 0 0 3.2402344 47.970703 L 14.210938 45.251953 C 17.434629 46.972929 21.092591 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 21.278025 46 17.792121 45.029635 14.761719 43.333984 A 1.0001 1.0001 0 0 0 14.033203 43.236328 L 4.4257812 45.617188 L 7.0019531 36.425781 A 1.0001 1.0001 0 0 0 6.9023438 35.646484 C 5.0606869 32.523592 4 28.890107 4 25 C 4 13.390466 13.390466 4 25 4 z M 16.642578 13 C 16.001539 13 15.086045 13.23849 14.333984 14.048828 C 13.882268 14.535548 12 16.369511 12 19.59375 C 12 22.955271 14.331391 25.855848 14.613281 26.228516 L 14.615234 26.228516 L 14.615234 26.230469 C 14.588494 26.195329 14.973031 26.752191 15.486328 27.419922 C 15.999626 28.087653 16.717405 28.96464 17.619141 29.914062 C 19.422612 31.812909 21.958282 34.007419 25.105469 35.349609 C 26.554789 35.966779 27.698179 36.339417 28.564453 36.611328 C 30.169845 37.115426 31.632073 37.038799 32.730469 36.876953 C 33.55263 36.755876 34.456878 36.361114 35.351562 35.794922 C 36.246248 35.22873 37.12309 34.524722 37.509766 33.455078 C 37.786772 32.688244 37.927591 31.979598 37.978516 31.396484 C 38.003976 31.104927 38.007211 30.847602 37.988281 30.609375 C 37.969311 30.371148 37.989581 30.188664 37.767578 29.824219 C 37.302009 29.059804 36.774753 29.039853 36.224609 28.767578 C 35.918939 28.616297 35.048661 28.191329 34.175781 27.775391 C 33.303883 27.35992 32.54892 26.991953 32.083984 26.826172 C 31.790239 26.720488 31.431556 26.568352 30.914062 26.626953 C 30.396569 26.685553 29.88546 27.058933 29.587891 27.5 C 29.305837 27.918069 28.170387 29.258349 27.824219 29.652344 C 27.819619 29.649544 27.849659 29.663383 27.712891 29.595703 C 27.284761 29.383815 26.761157 29.203652 25.986328 28.794922 C 25.2115 28.386192 24.242255 27.782635 23.181641 26.847656 L 23.181641 26.845703 C 21.603029 25.455949 20.497272 23.711106 20.148438 23.125 C 20.171937 23.09704 20.145643 23.130901 20.195312 23.082031 L 20.197266 23.080078 C 20.553781 22.728924 20.869739 22.309521 21.136719 22.001953 C 21.515257 21.565866 21.68231 21.181437 21.863281 20.822266 C 22.223954 20.10644 22.02313 19.318742 21.814453 18.904297 L 21.814453 18.902344 C 21.828863 18.931014 21.701572 18.650157 21.564453 18.326172 C 21.426943 18.001263 21.251663 17.580039 21.064453 17.130859 C 20.690033 16.232501 20.272027 15.224912 20.023438 14.634766 L 20.023438 14.632812 C 19.730591 13.937684 19.334395 13.436908 18.816406 13.195312 C 18.298417 12.953717 17.840778 13.022402 17.822266 13.021484 L 17.820312 13.021484 C 17.450668 13.004432 17.045038 13 16.642578 13 z M 16.642578 15 C 17.028118 15 17.408214 15.004701 17.726562 15.019531 C 18.054056 15.035851 18.033687 15.037192 17.970703 15.007812 C 17.906713 14.977972 17.993533 14.968282 18.179688 15.410156 C 18.423098 15.98801 18.84317 16.999249 19.21875 17.900391 C 19.40654 18.350961 19.582292 18.773816 19.722656 19.105469 C 19.863021 19.437122 19.939077 19.622295 20.027344 19.798828 L 20.027344 19.800781 L 20.029297 19.802734 C 20.115837 19.973483 20.108185 19.864164 20.078125 19.923828 C 19.867096 20.342656 19.838461 20.445493 19.625 20.691406 C 19.29998 21.065838 18.968453 21.483404 18.792969 21.65625 C 18.639439 21.80707 18.36242 22.042032 18.189453 22.501953 C 18.016221 22.962578 18.097073 23.59457 18.375 24.066406 C 18.745032 24.6946 19.964406 26.679307 21.859375 28.347656 C 23.05276 29.399678 24.164563 30.095933 25.052734 30.564453 C 25.940906 31.032973 26.664301 31.306607 26.826172 31.386719 C 27.210549 31.576953 27.630655 31.72467 28.119141 31.666016 C 28.607627 31.607366 29.02878 31.310979 29.296875 31.007812 L 29.298828 31.005859 C 29.655629 30.601347 30.715848 29.390728 31.224609 28.644531 C 31.246169 28.652131 31.239109 28.646231 31.408203 28.707031 L 31.408203 28.708984 L 31.410156 28.708984 C 31.487356 28.736474 32.454286 29.169267 33.316406 29.580078 C 34.178526 29.990889 35.053561 30.417875 35.337891 30.558594 C 35.748225 30.761674 35.942113 30.893881 35.992188 30.894531 C 35.995572 30.982516 35.998992 31.07786 35.986328 31.222656 C 35.951258 31.624292 35.8439 32.180225 35.628906 32.775391 C 35.523582 33.066746 34.975018 33.667661 34.283203 34.105469 C 33.591388 34.543277 32.749338 34.852514 32.4375 34.898438 C 31.499896 35.036591 30.386672 35.087027 29.164062 34.703125 C 28.316336 34.437036 27.259305 34.092596 25.890625 33.509766 C 23.114812 32.325956 20.755591 30.311513 19.070312 28.537109 C 18.227674 27.649908 17.552562 26.824019 17.072266 26.199219 C 16.592866 25.575584 16.383528 25.251054 16.208984 25.021484 L 16.207031 25.019531 C 15.897202 24.609805 14 21.970851 14 19.59375 C 14 17.077989 15.168497 16.091436 15.800781 15.410156 C 16.132721 15.052495 16.495617 15 16.642578 15 z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="bg-primary pb-14 pt-20 lg:pt-40">
        <div className="container justify-between md:grid-cols-2 lg:flex">
          <div className="flex flex-col justify-between lg:w-1/2">
            <Typography
              as="h2"
              variant="big"
              className="col-span-1 border-b-2 border-white pb-10 uppercase text-white"
            >
              {page.aboutTitle}
            </Typography>
            <Typography as="p" variant="body-big" className="mt-10 text-white">
              {page.aboutText}
            </Typography>
          </div>
          <Image
            className="flex-shrink-0"
            src={
              process.env.NEXT_PUBLIC_API_URL! +
              page.aboutImage?.data?.attributes.url
            }
            alt={page.aboutImage?.data?.attributes.url}
            width={455}
            height={455}
          />
        </div>
      </section>
      <section className="container relative py-20 md:py-40">
        <Typography
          as="p"
          variant="body-big"
          className="mt-10 max-w-5xl text-white"
        >
          {page.outro}
        </Typography>
        <div className="relative z-10 mt-20 grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 lg:mt-40 lg:gap-20">
          {page.outroItems?.map((item, index) => (
            <div key={index}>
              <Typography as="span" variant="h3" className="text-white">
                {index + 1}
              </Typography>
              <div className="my-4 h-0.5 w-48 bg-white" />
              <Typography
                as="p"
                variant="body2"
                className="mt-10 max-w-5xl text-white"
              >
                {item.text}
              </Typography>
            </div>
          ))}
        </div>
        <Image
          className="absolute bottom-20 right-0 hidden xl:block"
          src="/mockup.png"
          width={350}
          height={350}
          alt={""}
        />
      </section>
      <section className="container py-20">
        <Typography
          as="h4"
          variant="h1"
          className="col-span-1 mx-auto max-w-4xl uppercase text-white"
          align="center"
        >
          {page.twoBlocksTitle}
        </Typography>
        <div className="mt-28 grid gap-6 lg:grid-cols-2">
          {page.twoBlocks.map((item, index) => (
            <div
              className="flex flex-col bg-primary px-9 py-14 text-white"
              key={item.id}
            >
              <Typography
                as="h4"
                variant="h1"
                className="col-span-1 mb-10 max-w-xl"
                weight="regular"
              >
                {item.title}
              </Typography>
              {item.items.map((item, index) => (
                <div className="flex" key={item.id}>
                  <ArrowUpRightIcon className="mr-4 w-5" />
                  <Typography as="span" variant="body1">
                    {item.text}
                  </Typography>
                </div>
              ))}
              <div className="flex-grow" />
              <Typography
                as="span"
                variant="body2"
                className="mt-10 block max-w-lg"
              >
                {item.description}
              </Typography>
            </div>
          ))}
        </div>
      </section>
      <section className="container relative pb-72 pt-40">
        <Typography
          as="h4"
          variant="h1"
          className="col-span-1 mx-auto max-w-4xl uppercase text-white"
          align="center"
          dangerouslySetInnerHTML={{
            __html: setSlot(
              dictionary.home.moto,
              "<span class='bg-primary px-2'>DIGITAL</span>"
            ),
          }}
        ></Typography>
        <div
          className="absolute
		left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2
		transform rounded-full bg-gradient-to-br from-accent/10 
		to-accent/30 shadow-2xl shadow-accent/40 blur-3xl filter"
        />
        <span className="absolute right-0 top-0 text-7xl font-bold uppercase tracking-wider text-secondary/25">
          media
        </span>
        <span className="absolute left-0 top-2/3 max-w-3xl pb-10 pl-10 pt-24 text-7xl font-bold uppercase tracking-wider text-secondary/25">
          DIGITAL-MARKETING
        </span>
      </section>
      <section className="container py-40">
        <Typography
          as="h2"
          variant="big"
          align="center"
          className="col-span-1 uppercase text-white"
        >
          {dictionary.home.our_team}
        </Typography>
        <div className="grid gap-24 pt-40 text-white lg:grid-cols-3">
          {team.map((item) => (
            <div className="grid" key={item.id}>
              <div className="mb-10 flex items-end">
                <div className="relative flex-grow pb-[100%]">
                  <Image
                    src={
                      item.attributes.image?.data
                        ? process.env.NEXT_PUBLIC_API_URL! +
                          item.attributes.image?.data?.attributes.url
                        : "https://source.unsplash.com/random?gray&size=400x400"
                    }
                    width={400}
                    height={400}
                    className="absolute inset-0 h-full w-full object-cover"
                    alt={item.attributes.image?.data?.attributes.url}
                  />
                </div>
                <div className="h-[90%] w-5 bg-primary" />
              </div>
              <Typography as="h4" variant="h2" weight="regular">
                {item.attributes.name}
              </Typography>
              <div className="mb-8 mt-2 h-px w-48 bg-accent" />
              <Typography as="p" variant="h2" weight="regular">
                {item.attributes.role}
              </Typography>
            </div>
          ))}
          <div className="grid">
            <div className="mb-10 flex items-end">
              <div className="relative flex-grow pb-[100%]">
                <Image
                  src={
                    process.env.NEXT_PUBLIC_API_URL! +
                    "/uploads/sassen_ai_ed9fb72814.png"
                  }
                  fill
                  alt={""}
                />
              </div>
              <div className="h-[90%] w-5 bg-gray-700" />
            </div>
            <Typography as="h4" variant="h2" weight="regular">
              {dictionary.home.ai_title}
            </Typography>
            <div className="mb-8 mt-2 h-px w-48 bg-accent" />
            <Typography as="p" variant="h2" weight="regular">
              {dictionary.home.ai_subtitle}
            </Typography>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const response = await getHome(locale);
  const settings = await getContacts();
  const dictionaryKey = locale === "ru" ? "ru" : "en";
  const dictionary = await getDictionary(dictionaryKey);

  return {
    revalidate: 10 * 60,
    props: {
      page: response[0]?.data,
      services: response[1]?.data,
      faq: response[2]?.data,
      team: response[3]?.data,
      testmonials: response[4]?.data,
      promos: response[5]?.data,
      settings,
      dictionary,
    },
  };
};

interface IHomeProps {
  page: Homepage;
  services: Service[];
  faq: IFAQ[];
  team: Team[];
  testmonials: Testimonial[];
  promos: Promo[];
  settings: Settings;
  dictionary: ValueType<ReturnType<typeof getDictionary>>;
}
