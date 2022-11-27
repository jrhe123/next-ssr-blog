// next
import type { NextPage } from "next";
// react
import { useEffect } from "react";
// other
import styles from "./index.module.scss";
// antd
import { Form, Input, Button, message } from "antd";
// redux service
import { useUserService } from "../hooks";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 4 },
};

type UpdateProfileContainerProps = {};
const UpdateProfileContainer: NextPage<UpdateProfileContainerProps> = () => {
  const [form] = Form.useForm();
  const { getUserDetail, updateUserDetail, profile, isLoading } =
    useUserService();

  useEffect(() => {
    getUserDetail();
  }, [getUserDetail]);

  useEffect(() => {
    // csr load profile
    if (profile) {
      form.setFieldsValue(profile);
    }
  }, [form, profile]);

  const handleSubmit = (values: {
    nickname: string;
    job: string;
    introduce: string;
  }) => {
    if (isLoading) return;
    updateUserDetail(values);
  };

  return (
    <div className={styles.content_layout}>
      <div className={styles.userProfile}>
        <h2>Profile</h2>
        <div>
          <Form
            {...layout}
            form={form}
            className={styles.form}
            onFinish={handleSubmit}
          >
            <Form.Item label="Username" name="nickname">
              <Input placeholder="username" />
            </Form.Item>
            <Form.Item label="Job" name="job">
              <Input placeholder="job" />
            </Form.Item>
            <Form.Item label="Introduce" name="introduce">
              <Input placeholder="introduce" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileContainer;
