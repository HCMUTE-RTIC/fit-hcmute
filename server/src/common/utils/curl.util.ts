import { ApiEndpoint } from '../mock/api-endpoints.mock';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const generateBashCurl = (ep: ApiEndpoint): string => {
  let cmd = `curl -X ${ep.method} '${BASE_URL}${ep.path}' \\\n`;

  if (ep.auth) {
    cmd += `  -H 'Authorization: Bearer <TOKEN>' \\\n`;
  }

  if (ep.isFormData) {
    cmd += `  -F 'file=@image.jpg'`;
  } else if (ep.body) {
    cmd += `  -H 'Content-Type: application/json' \\\n`;
    cmd += `  -d '${JSON.stringify(ep.body)}'`;
  }
  return cmd.trim().replace(/\\\n$/, '');
};

export const generateWindowsCurl = (ep: ApiEndpoint): string => {
  let cmd = `curl -X ${ep.method} "${BASE_URL}${ep.path}"`;

  if (ep.auth) {
    cmd += ` ^\n  -H "Authorization: Bearer <TOKEN>"`;
  }

  if (ep.isFormData) {
    cmd += ` ^\n  -F "file=@image.jpg"`;
  } else if (ep.body) {
    cmd += ` ^\n  -H "Content-Type: application/json"`;
    const jsonBody = JSON.stringify(ep.body).replace(/"/g, '\\"');
    cmd += ` ^\n  -d "${jsonBody}"`;
  }
  return cmd;
};
