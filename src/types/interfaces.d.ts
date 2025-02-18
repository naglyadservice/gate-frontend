interface IAccesspoint {
  id: string;
  label: string;
  address: string;
}

interface IUser {
  id: string;
  email: string;
  name: string;
  image_url: string;
  phone_number: string;
  auto_1: string;
  auto_2: string;
}

interface IMyAccesspoints {
  id: string;
  label: string;
  address: string;
  rtsp_url: string;
  location: {
    id: string;
    name: string;
    address: string;
  }
}