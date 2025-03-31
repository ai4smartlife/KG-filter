import Yup from "yup";
import { Pattern } from "./pattern";
import { message } from "../constants";

const username = Yup.string().trim().required("Vui lòng nhập username");

const email = Yup.string()
  .trim()
  .email("Vui lòng nhập đúng định dạng email")
  .required(message.requiredMessage("Email"));

const requiredString = (requiredMessage?: string) => {
  return Yup.string()
    .trim()
    .required(requiredMessage || "Dữ liệu này không được để trống");
};

const notRequiredString = Yup.string().trim();

const password = Yup.string().matches(
  Pattern.password,
  "Mật khẩu tối thiểu có 6 ký tự, ít nhất một ký tự hoa, một ký tự thường, một số và một ký tự đặc biệt"
);

const confirmPassword = Yup.string().oneOf(
  [Yup.ref("password")],
  "Xác nhận mật khẩu phải giống với mật khẩu"
);

const phone_number = Yup.string()
  .required(message.requiredMessage("Số điện thoại"))
  .matches(Pattern.phone_number, "Số điện thoại không hợp lệ");

const date_of_birth = Yup.date()
  .nullable()
  .transform((v) => (v instanceof Date && !isNaN(+v) ? v : null))
  .min(new Date("1950-01-01"), "Ngày không hợp lệ")
  .max(new Date(), "Ngày sinh không thể trở là ngày trong tương lai");

const phone_country = Yup.string()
  .required()
  .matches(/^(84|856|82|86){1}$/, "Mã vùng quốc gia không hợp lệ");

const max = () => {};
const scope_supply = Yup.mixed().test(
  "is-valid-string-or-array",
  "Phạm vi cung cấp không đúng định dạng.",
  (value) => {
    const allowedValues = ["84", "856", "82", "86"];
    if (typeof value === "string") {
      return allowedValues.includes(value);
    } else if (Array.isArray(value)) {
      return value.every((item) => allowedValues.includes(item));
    }
    return false;
  }
);

const category = Yup.mixed().test(
  "is-string-or-array-of-strings",
  "Ngành hàng cung cấp không đúng định dạng",
  (value) => {
    if (typeof value === "string") {
      return true;
    } else if (Array.isArray(value)) {
      return value.every((item) => typeof item === "string");
    }
    return false;
  }
);

export const CommonValidation = {
  username,
  email,
  requiredString,
  notRequiredString,
  password,
  phone_number,
  phone_country,
  confirmPassword,
  date_of_birth,
  scope_supply,
  category,
};
