import { useState, type FC } from "react";
import { type TestimonialsProps } from "./Testimonials.props";
import { TestimonialCard } from "../Cards/TestimonialCard/TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import styles from "./Testimonials.module.css";
import Slider, { type Settings } from "react-slick";

export const Testimonials: FC<TestimonialsProps> = ({
  testimonials = [],
  className,
}) => {
  const classes = cn(styles.testimonials, className);

  const sliderOptions: Settings = {
    slidesToScroll: 1,
    slidesToShow: 3,
    nextArrow: <ArrowRightIcon />,
    prevArrow: <ArrowLeftIcon />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderOptions} className={classes}>
      {testimonials.map((testimonial, index) => (
        <div className="px-10" key={testimonial.id}>
          <TestimonialCard
            name={testimonial.attributes.name}
            role={testimonial.attributes.role}
            quote={testimonial.attributes.quote}
            avatar={testimonial.attributes.avatar?.data.attributes.url}
          />
        </div>
      ))}
    </Slider>
  );
};
