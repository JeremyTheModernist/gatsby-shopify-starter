//  boop
import { css, keyframes } from "@emotion/core";

const fadeIn = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
  }
  to {
    visibility: visible;
    opacity:1
  }
`;

const fadeOut = keyframes`
  from {
    visibility: visible;
    opacity: 1;
  }
  to {
    visibility: hidden;
    opacity:0
  }
`;

export const fadeInAnimation = css`
	animation: ${fadeIn} 0.25s ease-in-out 1;
`;

export const fadeOutAnimation = css`
	animation: ${fadeOut} 0.25s ease-out 1;
`;
