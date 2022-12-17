import React from "react";
import { HomePageLayout } from "./HomePage.styled";
import PlayerBanner from "@/components/player/player-banner/PlayerBanner";

export default function HomePage(): JSX.Element {
  return (
    <HomePageLayout>
      <div>
        <PlayerBanner
          userShortName="SK"
          backgroundColor="black"
          borderColor="white"
          avatarBackgroundColor="green"
          avatarBorderColor="yellow"
          avatarColor="yellow"
        />
      </div>
    </HomePageLayout>
  );
}
