import $ from 'jquery';

export const HOST = 'https://uxcandy.com';
export const DEVELOPER = 'test'
export const BACKEND_API = '/~shapoval/test-task-backend/v2'

export const formDataFromParams = (params = {}) => {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.set(key, value)
  })
  return formData;
}

export const fetchGet = async (urlString, paramsJSON) => {
  const params = {...paramsJSON, developer: DEVELOPER}
  const url = new URL(BACKEND_API + urlString, HOST);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  return  await fetch(url.toString()).then(res => res.json())
}

export const fetchPost = async (urlString, paramsJSON) => {
  const url = new URL(BACKEND_API + urlString+'/', HOST);
  url.searchParams.set('developer', DEVELOPER);
  const form = formDataFromParams(paramsJSON)
  const response = await fetch(url.toString(), {
    method: 'POST',
    cors: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': "multipart/form-data; charset=utf-8",
    },
    referrerPolicy: 'no-referrer',
    body:form
  });
  return await response.json();
}

export const ajaxPost = async (urlString, paramsJSON) => {
  const url = HOST + BACKEND_API + urlString + '?developer=' + DEVELOPER
  const form = formDataFromParams(paramsJSON)
  return await new Promise((resolve, reject) => {
    $.ajax({
      url,
      crossDomain: true,
      method: 'POST',
      mimeType: "multipart/form-data",
      contentType: false,
      processData: false,
      data: form,
      dataType: "json",
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, error) {
        reject(error)
      }
    });
  });
}
