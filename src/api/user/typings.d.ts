// @ts-ignore
/* eslint-disable */
declare namespace API {

  type AmendPasswordParams = {
    old_password: string;
    new_password: string;
  };

  type AmendAvatar = {
    file: string;
  };
  type CommonRes = {
    status: number;
    data?: string;
    msg?: string;
    error?: string;
  };

  type loginParam = {
    stu_number?: string,
    password?: string
  }

  type loginRes = {
    status?: number
    data?: {
      user?: loginResItem[],
      token?: string
    }
    msg?: string
    error?: string
  }

  type loginResItem = {
    user_name?: string
    stu_number?: string
    phone_number?: string
    authority?: number
    avatar?: string
  }

  type rankRes = {
    status?: number
    data?: {
      item?: rankResItem[],
      total?: number
    }
    error?: string
    msg?: string
  }
  type rankResItem = {
    score?: number
    user_name?: string
    avatar?: string
  }
  type userInfoRes = {
    status?: number
    data?: userInfoResItem
    error?: string
    msg?: string
  }
  type userInfoResItem = {
    user_name?: string
    phone_number?: string
    stu_number?: string
    avatar?: string
    authority?: number
  }
  type personActivityRes = {
    status?: number
    data?: personActivityResItem[]
    error?: string
    msg?: string
  }
  type personActivityResItem = {
    activity_id?: number
    activity_name?: string
    category_name?: string
    publisher_number?: string
    publisher_name?: string
    image?: string
    activity_unit?: string
    activity_place?: string
    content?: string
    sign_up_start_time?: number
    sign_up_end_time?: number
    activity_end_time?: number
    code?: string
    activity_start_time?: number
    recruitment?: number
    sign_in_place?: string
    sign_in_range?: number
    basic_score?: number
    responsible_people?: string
    responsible_people_phone?: string
    status?: number
  }
  type allScoreResGet = {
    status?: number
    data?: number
    error?: string
    msg?: string
  }

  type allScoreResPost = {
    status?: number
    data?: {
      activity: allScoreResPostItem,
      extra_add: allScoreResPostItem,
      extra_deduction: allScoreResPostItem,
    }
    error?: string
    msg?: string
  }

  type allScoreResPostItem = {
    category: string,
    title: string,
    score: number
  }

  type allScoreResPostParam = {
    year_start_time_stamp?: number
    year_end_time_stamp?: number
    semester_start_time_stamp?: number
    semester_end_time_stamp?: number
  }
  type SemesterListParam = {
    year: string; //学年
  };
  type SemesterListResItem = {
    stu_number?: string;
    semester_name?: string;
  };
  type SemesterListRes = {
    status?: number;
    data?: {
      item?: Array<SemesterListResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
  type YearListResItem = {
    stu_number: string;
    year_name?: string;
  };
  //  "proxy": "http://139.9.196.99:3000/",
  type YearListRes = {
    status?: number;
    data?: {
      item?: Array<YearListResItem>;
      total?: number;
    };
    msg?: string;
    error?: string;
  };
}
