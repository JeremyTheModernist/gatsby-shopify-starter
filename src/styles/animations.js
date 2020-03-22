//  boop
import { css, keyframes } from "@emotion/core";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity:0
  }
`;

export const fadeInAnimation = css`
	animation: ${fadeIn} 0.25s ease-in-out 1;
`;

export const fadeOutAnimation = css`
	animation: ${fadeOut} 0.25s ease-out 1;
`;
