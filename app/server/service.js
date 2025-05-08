import { Alert } from "react-native";
import { CHECKDOMAINURL, SIGNIN } from "./constant";

export const fetchApi = async (url, method, body, statusCode, token) => {
  const headers = token ? { 'x-auth': token, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
  const result = { token: null, success: false, responseBody: null, error: null };

  try {
    const response = await fetch(url, {
      method: method,  // POST, PUT, etc.
      headers: headers,
      body: JSON.stringify(body),  // Ensure body is stringified for JSON payloads
    });

    if (response.status === statusCode) {
      result.success = true;
      result.responseBody = await response.json();  // Parse the response body as JSON
    } else {
      console.log('Unexpected response:', response);
    }
  } catch (error) {
    result.error = error.message;
    console.log('Error:', error);
  }

  return result;
};

export const checkUserDomain = async (payload) => {
    
      try {
        console.log('check domain url is', CHECKDOMAINURL + payload);
        // const response = await fetchApi(CHECKDOMAINURL, 'GET', payload, 200);
        const response = await fetch(CHECKDOMAINURL + payload+'.finexcloud.com', {
          method: 'GET',
        });
        console.log('actionssss', response);
        let json = await response.json();
        console.log('actionssss', json);
  
        if (json.isSuccess) {
          return json;
        } else {
          throw json;
        }
      } catch (error) {
        
        return error;
      }
    
  };

export const loginUser =async (payload )=> {
      try {
        const response = await fetchApi(SIGNIN, 'POST', payload, 200);
  
        if (response.success) {
          return response;
        } else {
          throw response;
        }
      } catch (error) {
        return error;
      }
  };

  export const fetchService = async (url, method, token) => {
    try {
      console.log('api');
      let response = await fetch(url, {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('api response for product', response);
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      Alert.alert('Error', 'Something went wrong', error);
      console.log('Error in retrieving userinfo from Auth0: ' + error);
      return error;
    }
  };

  export const loadOrders =async (token, url) => {
      try {
        const response = await fetchService(url, 'GET', token);
        console.log(response);
        if (response.success) {
          
          return response;
        } else {
          throw response;
        }
      } catch (error) {
        
        return error;
      }
  };


