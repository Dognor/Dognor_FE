import styled from "@emotion/styled";

export const Btn = styled.button`
  /* color: ${(props) => (props.selected ? "darkblue" : "black")}; */
  background-color: ${(props) =>
    props.color === "blue"
      ? props.theme.colors.primary_blue
      : props.theme.colors.primary_purple};
  /* background-color: ${(props) => props.theme.colors.primary_blue}; */
  color: ${(props) => (props.color == "blue" ? "fff" : "#000")};
`;

export const Flex = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const Input = styled.input(({ theme }) => ({
  width: "100%",
  height: "42px",
  fontSize: "14px",
  fontFamily: `"SpoqaHanSansNeo", "Arial", "sans-serif"`,
  "::placeholder": {
    color: theme.colors.neutrals_03,
  },
  "&:focus": {
    border: `2px solid ${theme.colors.neutrals_04}`,
    outline: "none",
    color: theme.colors.neutrals_01,
  },
  border: `1px solid ${theme.colors.neutrals_05}`,
  borderRadius: theme.styles.radius,
  textIndent: "12px",
  boxSizing: "border-box",
}));

export const Button = styled.button(({ theme, status }) => ({
  padding: "10px",
  marginLeft: "8px",
  whiteSpace: "nowrap",
  backgroundColor:
    status === "disabled" ? theme.colors.neutrals_05 : theme.colors.neutrals_04,
  outline: "none",
  border: 0,
  color: theme.colors.neutrals_08,
  fontSize: "16px",
  borderRadius: theme.styles.radius,
  fontWeight: 700,
  letterSpacing: "0.5px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.colors.neutrals_03,
  },
}));
export const Label = styled.label(({ theme }) => ({
  color: theme.colors.neutrals_01,
  fontWeight: 700,
}));

export const Info = styled.p(({ theme, status }) => ({
  color:
    status === "error"
      ? theme.colors.point_orange_normal_100
      : theme.colors.neutrals_03,
  fontWeight: 300,
  fontSize: "14px",
}));