import * as yup from "yup";

const signupSchema = yup.object().shape({
  userId: yup
    .string()
    .required("아이디를 입력하세요")
    .min(4, "아이디는 최소 4자 이상이어야 합니다")
    .max(16, "아이디는 최대 16자까지 입력할 수 있습니다")
    .matches(/^[a-zA-Z0-9_-]+$/, "영문자, 숫자, '-', '_'만 사용할 수 있습니다"),
  password: yup
    .string()
    .required("비밀번호를 입력하세요")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
    .matches(/[a-zA-Z]/, "영문자를 포함해야 합니다")
    .matches(/[0-9]/, "숫자를 포함해야 합니다")
    .matches(/[^a-zA-Z0-9]/, "특수문자를 포함해야 합니다")
    .matches(/^\S*$/, "공백 없이 입력해야 합니다"),
  name: yup.string().required("이름을 입력하세요"),
  email: yup
    .string()
    .email("유효한 이메일 형식이 아닙니다")
    .required("이메일을 입력하세요"),
});

export default signupSchema;
