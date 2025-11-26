const dummyUser = {
  email: "user@test.com",
  name: "Demo User",
};

export const authenticateUser = (email, password) => {
  if (email === dummyUser.email && password) {
    return {
      success: true,
      user: { ...dummyUser },
      token: "mock-token",
    };
  }

  return {
    success: false,
    message: "이메일 또는 비밀번호가 올바르지 않습니다.",
  };
};

