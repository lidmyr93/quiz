import styled from "styled-components";

interface StyledPlayerBannerProps {
  borderColor: string;
  backgroundColor: string;
}

export const StyledPlayerBanner = styled.div<StyledPlayerBannerProps>`
  margin-left: 100px;
  width: 100px;
  height: 500px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 50% 100%, 0 95%);
  background: ${(p) => p.borderColor};
  display: flex;
  justify-content: center;

  .inner {
    clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 50% 100%, 0 95%);
    background: ${(p) => p.backgroundColor};
    width: 93%;
    height: 99%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 50px;
  }
`;

interface StyledPlayerSymbolProps {
  avatarBackgroundColor: string;
  avatarBorderColor: string;
  avatarColor: string;
}
export const PlayerSymbol = styled.span<StyledPlayerSymbolProps>`
  background: ${(p) => p.avatarBackgroundColor};
  border: 2px solid ${(p) => p.avatarBorderColor};
  color: ${(p) => p.avatarColor};
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
