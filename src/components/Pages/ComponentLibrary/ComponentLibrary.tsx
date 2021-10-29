import * as React from 'react';
import { PlayPauseButton, ProgressBar, SearchBar, Skeleton, Spinner } from 'rpg2014-components';
import { ProgressBarProps } from 'rpg2014-components/build/ProgressBar/ProgressBar.types';
import { SearchBarProps } from 'rpg2014-components/build/SearchBar/SearchBar.types';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import './componentlibrary.scss';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { PlayPauseButtonProps } from 'rpg2014-components/build/PlayPauseButton/PlayPauseButton.types';
import { SkeletonProps } from 'rpg2014-components/build/Skeleton/Skeleton.types';
import { SpinnerProps } from 'rpg2014-components/build/Spinner/Spinner.types';

SwiperCore.use([Navigation, Pagination, Scrollbar, EffectCoverflow]);

interface IComponentLibrary {}

interface IComponent {
  type: React.ElementType | any;
  name?: string;
  props: SearchBarProps | ProgressBarProps | PlayPauseButtonProps | SkeletonProps | SpinnerProps;
}

const listOfComponents: IComponent[] = [
  {
    type: SearchBar,
    name: 'Search Bar',
    props: {
      label: 'Search Bar',
      variant: 'underline',
      width: '60%',
      buttonLabel: '🡲',
      placeholder: 'Placeholder',
    },
  },
  {
    type: ProgressBar,
    name: 'Progress Bar',
    props: {
      percentage: 50,
      style: 'bar',
      label: '',
      height: '0.5rem',
      width: '45%',
      showPercentage: false,
      highlightOnHover: true,
    },
  },
  {
    type: PlayPauseButton,
    name: 'Play button',
    props: {
      play: false,
    },
  },
  {
    type: Skeleton,
    name: 'Skeleton loader',
    props: {
      width: '50%',
      height: '40',
    },
  },
  {
    type: Spinner,
    name: 'Spinner',
    props: {
      size: 'lg',
      color: 'primary',
      theme: 'dark',
    },
  },
];

export const ComponentLibrary = (props: IComponentLibrary) => {
  return (
    <div className="page-wrapper  pt-5">
      <h2 className="mb-1 text-dark titleclass text-center">Component Library </h2>
      <a href="https://github.com/rpg2014/Components" className="text-muted">
        <h6>Github link</h6>
      </a>
      <Swiper
        className="library-wrapper"
        spaceBetween={50}
        slidesPerView={2}
        pagination={{ clickable: true, type: 'bullets' }}
        direction="vertical"
        centeredSlides
        grabCursor
      >
        {listOfComponents.map((Component) => (
          <SwiperSlide key={Component.type.toString()} className="component-wrapper  mx-auto shadow">
            <Component.type {...Component.props} />
            <p className=" text-dark p-1 rounded transparency  mt-2">{Component.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
