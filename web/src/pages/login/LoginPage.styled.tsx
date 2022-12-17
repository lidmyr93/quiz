import styled from "styled-components";

export const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;

  form {
    padding: 2rem 3rem;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.17);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
