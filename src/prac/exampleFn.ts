type Email = string;

/**
 *  validateAndSendEmail 로직을 분리하자
 */
// const validateAndSendEmail = async (email: Email, content: string) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (emailRegex.test(email)) {
//     // 이메일 유효성 검사 통과 후, 이메일 전송 로직
//     console.log(`Sending email to ${email}: ${content}`);
//     // 예시를 위한 가상의 비동기 처리
//     await new Promise(resolve => setTimeout(resolve, 1000));
//   } else {
//     console.error("Invalid email address");
//   }
// }

const validateEmail = (email: Email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = emailRegex.test(email);
  return result;
};

const sendEmail = async (email: Email, content: string) => {
  // 이메일 유효성 검사 통과 후, 이메일 전송 로직
  console.log(`Sending email to ${email}: ${content}`);
  // 예시를 위한 가상의 비동기 처리
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

const sendError = () => {
  console.error("Invalid email address");
};

const validateAndSendEmail = async (email: Email, content: string) => {
  const result = validateEmail(email);
  if (result) {
    await sendEmail(email, content);
  } else {
    sendError();
  }
};

export { validateAndSendEmail };
