// @ts-ignore
/* eslint-disable */
declare namespace API {
  type activityRes = {
    msg?: string;
    data?: string;
    status?: number;
    error?: string;
  };
  type activityPublicityRes = {
    msg?: string;
    data?:
      | {
          item: activityPublicityResItem[];
          total: number;
        }
      | string;
    status?: number;
    error?: string;
  };
  type activityPublicityResItem = {
    activity_detail_id?: number;
    activity_id?: number;
    stu_number?: string;
    user_name?: string;
    phone?: string;
    activity_score?: number;
    add_date?: number;
    activity_status?: number;
  };
  type commonRes = {
    msg?: string;
    data?: string;
    status?: number;
    error?: string;
  };
  type activityParam = {
    activity_name?: string;
    activity_unit?: string;
    category_name?: string;
    content?: string;
    activity_place?: string;
    sign_up_start_time?: number;
    sign_up_end_time?: number;
    recruitment?: number;
    code?: string;
    basic_score?: number;
    sign_in_range?: number;
    sign_in_place?: string;
    responsible_people?: string;
    responsible_people_phone?: number;
  };
  type activityListRes = {
    data?: {
      item?: activityListResItem[];
      total?: number;
    };
    status?: number;
    error?: string;
    msg?: string;
  };
  type activityListResItem = {
    activity_id?: number;
    activity_name?: string;
    category_name?: string;
    activity_unit?: string;
    publisher_number?: string;
    publisher_name?: string;
    image?: string;
    content?: string;
    activity_place?: string;
    sign_up_end_time?: number;
    sign_up_start_time?: number;
    activity_start_time?: number;
    activity_end_time?: number;
    recruitment?: number;
    code?: string;
    basic_score?: number;
    sign_in_place?: string;
    sign_in_range?: number;
    responsible_people?: string;
    responsible_people_phone?: string;
    status?: number;
  };
  type activityListParam = {
    page_size?: number;
    page_num?: number;
    category_name?: string;
  };

  type signParam = {
    code?: string;
    signed?: number;
    stu_longitude?: number;
    stu_latitude?: number;
  };
}
