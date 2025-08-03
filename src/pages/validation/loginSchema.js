import * as yup from "yup";

const loginSchema = yup.object({
  userId: yup.string().trim().required("아이디를 입력하세요"),
  password: yup.string().trim().required("비밀번호를 입력하세요"),
});

export default loginSchema;
