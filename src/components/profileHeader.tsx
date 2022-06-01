import React, {useState} from 'react';
import '../assets/styles/components/profileHeader.scss';
import {Image,  Space, Toast} from 'antd-mobile';
import {useDispatch, useSelector} from 'react-redux';
import {Upload} from 'antd';
import {RootState} from "../store";
import {Code} from "../constant";
import {changeAvatar} from "../api/user";

const ProfileHeader: React.FC = () => {
    const dispatch = useDispatch();
    const {avatar, updateAvatar, user_name, stu_number} = useSelector((state: RootState) => state.user);
    const [imageUrl, setImageUrl] = useState<string>(avatar || '');
    const handleSubmitFile = async (file: any) => {
      const res = await changeAvatar({file: file.file});
      if (res.status === Code.SuccessCode) {
        setImageUrl(imageUrl);
        Toast.show({
          icon: 'success',
          content: '更换头像成功!',
        });
        getBase64(file.file, (imageUrl: any) => {
          setImageUrl(imageUrl);
          dispatch(updateAvatar(imageUrl));
        });
      } else {
        Toast.show({
          icon: 'fail',
          content: '出了点小问题!',
        });
      }
    };
    const beforeUpload = (file: any) => {
      //控制上传图片格式
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        Toast.show({
          icon: 'fail',
          content: '您只能上传JPG/PNG 文件!',
        });
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        Toast.show({
          icon: 'fail',
          content: '图片大小必须小于2MB!',
        });
        return;
      }
      return isJpgOrPng && isLt2M;
    };
    const getBase64 = (img: any, callback: any) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    };
    const handleChange = (info: any) => {
      if (info.file.status === 'uploading') {
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl: any) => {
          setImageUrl(imageUrl);
        });
      }
    };
    return (
      <div className="scoped">
        <Space className="header_box">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleSubmitFile}
            beforeUpload={beforeUpload}
            accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
          >
            {imageUrl ? (
              <Image src={imageUrl} alt="avatar" className="avatar" fit="cover"/>
            ) : (
              avatar
            )}
          </Upload>
          <div className="info_box">
            <div>{user_name}</div>
            <div>{stu_number}</div>
          </div>
        </Space>
      </div>
    );
  }
;
export default ProfileHeader;
