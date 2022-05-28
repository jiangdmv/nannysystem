const LOCAL_LOGIN_API_BASE_URL = "/api";

const getCustomerApi = async () => {
  const response = await fetch(`${LOCAL_LOGIN_API_BASE_URL}/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const generateCodeApi = async (registerInfo: any) => {
  const response = await fetch(`${LOCAL_LOGIN_API_BASE_URL}/generateCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerInfo),
  });
  return response;
};

const loginApi = async (accountInfo: any) => {
  const response = await fetch(`${LOCAL_LOGIN_API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(accountInfo),
  });
  return response;
};

const logoutApi = async () => {
  const response = await fetch(`${LOCAL_LOGIN_API_BASE_URL}/logout`, {
    method: "POST",
  });
  return response;
};

export default { getCustomerApi, generateCodeApi, loginApi, logoutApi };
