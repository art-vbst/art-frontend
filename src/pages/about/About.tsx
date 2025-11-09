import * as React from 'react';
import about_img from '~/assets/cc65d761-1ea5-41c6-a9fe-c14d4a5d0ab9.jpg';
import { Skeleton } from '~/components/Skeleton/Skeleton';

export const About = () => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-12 flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          {!imageLoaded && (
            <Skeleton className="w-full rounded" aspectRatio="569/319" />
          )}
          <img
            src={about_img}
            alt="Violet Bergeson"
            style={{ display: imageLoaded ? 'block' : 'none' }}
            onLoad={() => setImageLoaded(true)}
            className="w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-xl font-medium">Violet Bergeson</h2>
          <p className="text-gray-light mt-4 text-sm">
            Connect with me on Instagram!
          </p>
          <a
            href="https://www.instagram.com/violetbergeson.art"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium"
          >
            @violetbergeson.art
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="text-xl font-semibold">Biography</h3>
          <p className="text-gray-light text-sm leading-relaxed">
            I was born and raised in Canada, near the rocky mountains. As an
            adult I have lived in several states including Hawaii, Louisiana,
            Virginia, and Texas. While there were things I enjoyed about each of
            these places, I'm happy I found my way back to the mountains, this
            time in Utah. I love hiking, camping and rock climbing and just
            enjoying the beautiful outdoors with my husband and four children.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="text-xl font-semibold">My Beginnings in Art</h3>
          <p className="text-gray-light text-sm leading-relaxed">
            I have always loved to draw and remember being very inspired as a 5
            year old, overhearing a proud grandma brag about how her grandson
            could draw whatever he wanted just from his imagination. As a teen I
            took lessons from a watercolor artist in my community, Rene Hill. As
            I approached college I was incredibly intimidated by the idea of
            submitting a portfolio and got my bachelor's degree in history and
            German instead.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="text-xl font-semibold">Recent Developments</h3>
          <p className="text-gray-light text-sm leading-relaxed">
            I started studying art more seriously in 2022 after my youngest son
            was born. I've had the privilege of learning from artists like Emily
            Fox King, Andrew Payne, and Kirk Richards at the J. Kirk Richards
            Studio Academy over the past few years.
            <br />
            <br />I have learned to love oil painting, and how a painting can
            communicate a feeling in a way words can't. My painting practice has
            become a refuge for me from the wonderful chaos that is raising
            children. It helps me to recharge, and step back to see the beauty
            in the commotion of my day to day life.
          </p>
        </div>
      </div>
    </div>
  );
};
