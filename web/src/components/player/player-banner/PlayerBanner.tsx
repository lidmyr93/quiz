import { FC } from "react";
import { StyledPlayerBanner, PlayerSymbol } from "./PlayerBanner.styled";

export interface PlayerBannerProps {
  userShortName: string;
  backgroundColor: string;
  borderColor: string;
  avatarColor: string;
  avatarBackgroundColor: string;
  avatarBorderColor: string;
}
const PlayerBanner: FC<PlayerBannerProps> = ({
  userShortName,
  backgroundColor,
  borderColor,
  avatarBackgroundColor,
  avatarColor,
  avatarBorderColor,
}) => {
  return (
    <StyledPlayerBanner
      {...{
        backgroundColor,
        borderColor,
      }}
    >
      <div className="inner">
        <PlayerSymbol
          {...{ avatarBackgroundColor, avatarColor, avatarBorderColor }}
        >
          <p>{userShortName}</p>
        </PlayerSymbol>
      </div>
    </StyledPlayerBanner>
  );
};

export default PlayerBanner;
